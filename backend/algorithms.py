import json
import random

from django.db import models
from django.db.models import Avg, Max
from django.forms.models import model_to_dict

from .models import *


def similar_students(userid):
    u = Student.objects.get(userid=userid)

    # user only specified one test score, act XOR sat, convert it to the other
    if bool(u.SAT) ^ bool(u.ACT_composite):
        with open("backend/data/act_sat.json") as f:
            conversion = json.loads(f.read())
            if u.ACT_composite:
                SAT_range = conversion[str(u.ACT_composite)]
                low, high = tuple(SAT_range.split("-"))
                u.SAT = (int(low) + int(high)) // 2
            else:
                for act, SAT_range in conversion.items():
                    low, high = tuple(SAT_range.split("-"))
                    if u.SAT >= int(low) and u.SAT <= int(high):
                        u.ACT_composite = int(act)
                        break

    # aggregate with class mates
    if u.high_school_name:
        classmates = Student.objects.filter(high_school_name=u.high_school_name)
        if not u.SAT and not u.ACT_composite:
            u.ACT_composite = int(
                classmates.aggregate(Avg("ACT_composite"))["ACT_composite__avg"]
            )
            u.SAT = int(classmates.aggregate(Avg("SAT"))["SAT__avg"])
        if not u.GPA:
            u.GPA = classmates.aggregate(Avg("GPA"))["GPA__avg"]

    # user did not specify a hs or any fields, aggregate based on SAT and act
    all_students = Student.objects.all()
    if not u.SAT and not u.ACT_composite:
        u.ACT_composite = int(
            all_students.aggregate(Avg("ACT_composite"))["ACT_composite__avg"]
        )
        u.SAT = int(all_students.aggregate(Avg("SAT"))["SAT__avg"])
    if not u.GPA:
        u.GPA = all_students.aggregate(Avg("GPA"))["GPA__avg"]
        
    # At this point, user has GPA, SAT, and ACT
    for s in all_students:
        hs = ap = gpa = composite = 0

        s.GPA = s.GPA or 0
        # Why not just subtract?
        # abs (4.0 - (s.Gpa - u.gpa)) / 4.0
        if s.GPA < u.GPA:
            gpa = (s.GPA - (s.GPA - u.GPA) / 2) / u.GPA
        else:
            gpa = (u.GPA - (u.GPA - s.GPA) / 2) / s.GPA

        if s.SAT:
            if s.SAT < u.SAT:
                composite = (s.SAT - (s.SAT - u.SAT) / 2) / u.SAT
            else:
                composite = (u.SAT - (u.SAT - s.SAT) / 2) / s.SAT

        if s.ACT_composite:
            if s.ACT_composite < u.ACT_composite:
                composite = (s.ACT_composite - (s.ACT_composite -
                                                u.ACT_composite) / 2) / u.ACT_composite
            else:
                composite = (u.ACT_composite - (u.ACT_composite -
                                                s.ACT_composite) / 2) / s.ACT_composite

        if u.high_school_name is not None and s.high_school_name is not None:
            if u.high_school_name == s.high_school_name:
                hs = 1
            elif u.high_school_state == s.high_school_state:
                hs = 0.5

        if u.num_AP_passed is not None and s.num_AP_passed is not None:
            max_num = Student.objects.all().aggregate(Max('num_AP_passed'))['num_AP_passed__max']
            ap = (max_num - abs(u.num_AP_passed - s.num_AP_passed)) / max_num


        s.similar_score = 0.2*hs + 0.2*ap + 0.4*composite + 0.2*float(gpa)

    #result.sort(key=lambda s: s.similar_score)
    #all_students = sorted(all_students,key=lambda s: s.similar_score)
    all_students.order_by('-similar_score')

    return all_students[:100]


def recommend_colleges(user_id, colleges):
    scores = []
    students = similar_students(user_id)

    for college in colleges:
        college = College.objects.get(name=college)
        applications = college.application_set.all().filter(questionable=False)
        
        n_pending = len(applications.filter(status='pending'))
        n_accepted = len(applications.filter(status='accepted'))
        n_waitlisted = len(applications.filter(status='waitlisted'))
        n_withdrawn = len(applications.filter(status='withdrawn'))
        n_deferred = len(applications.filter(status='deferred'))

        sum_similary_score_pending = 0
        sum_similarity_score_accepted = 0
        sum_similary_score_waitlisted = 0
        sum_similarity_score_withdrawn = 0
        sum_similarity_score_deferred = 0

        for student in students:
            try:
                app = student.application_set.get(college__name=college)
                student_application_status = app.status
                student_score = student.similar_score
                
                if(student_application_status == "accepted"):
                    sum_similarity_score_accepted += student_score
                elif(student_application_status == "pending"):
                    sum_similary_score_pending += student_score
                elif(student_application_status == "waitlisted"):
                    sum_similary_score_waitlisted += student_score
                elif(student_application_status == "withdrawn"):
                    sum_similarity_score_withdrawn += student_score
                elif(student_application_status == "deferred"):
                    sum_similarity_score_deferred += student_score

            except Application.DoesNotExist:
                continue
                    
        total_rank = 600
        rank_position = college.ranking
        college_r = 1 - (rank_position - 1) / total_rank
        
        accepted_ratio = sum_similarity_score_accepted/n_accepted if n_accepted > 0 else 0
        pending_ratio = sum_similary_score_pending/n_pending if n_pending > 0 else 0
        waitlisted_ratio = sum_similary_score_waitlisted/n_waitlisted if n_waitlisted > 0 else 0
        deferred_ratio = sum_similarity_score_deferred/n_deferred if n_deferred > 0 else 0
        withdrawn_ratio = sum_similarity_score_withdrawn/n_withdrawn if n_withdrawn > 0 else 0
        
        total_similarity = 0.7*accepted_ratio + 0.1*pending_ratio + 0.1*waitlisted_ratio + 0.05*deferred_ratio + 0.05*waitlisted_ratio
        result = 0.8*total_similarity + 0.2*college_r
        result = round(result*100)
        scores.append(result)

    return scores


def similar_hs(hs_name):
    u_hs = HighSchool.objects.get(name__icontains=hs_name)
    res = []
    for hs in HighSchool.objects.all():
        score = 0
        if u_hs.city == hs.city:
            score = score + 1
        if u_hs.state == hs.state:
            score = score + 0.5
        if u_hs.sat and hs.sat:
            score += (1600 - abs(u_hs.sat - hs.sat)) / 1600
        if u_hs.act and hs.act:
            score += (36 - abs(u_hs.act - hs.act)) / 36
        if u_hs.grad_rate and hs.grad_rate:
            score += 1 - abs(u_hs.grad_rate - hs.grad_rate)
        if u_hs.ap_enroll and hs.ap_enroll:
            score += 1 - abs(u_hs.ap_enroll - hs.ap_enroll)
        if u_hs.num_students and hs.num_students:
            max_students = HighSchool.objects.aggregate(Max('num_students'))['num_students__max']
            score += 1 - abs(u_hs.num_students - hs.num_students) / max_students
        e = model_to_dict(hs)
        e["score"] = score
        res.append(e)
    return sorted(res, reverse=True, key=lambda x: x["score"])


def verify_acceptance_decision(userid, app):

    u = Student.objects.get(userid=userid)
    apps = Application.objects.filter(college__name=app["college"], status=app["status"])
    score = 0

    for app in apps:
        s = app.student
        if u.ACT_composite and s.ACT_composite:
            score += abs(u.ACT_composite - s.ACT_composite) / 36
        if u.GPA and s.GPA:
            score += float(abs(u.GPA - s.GPA)) / 4.0
        if u.SAT_math and s.SAT_math:
            score += abs(u.SAT_math - s.SAT_math) / 800
        if u.SAT_EBRW and s.SAT_EBRW:
            score += abs(u.SAT_EBRW - s.SAT_EBRW) / 800

    print(len(apps))
    print(score)

    return True if score >= len(apps) else False
