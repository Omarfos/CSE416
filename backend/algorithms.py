import json
import random

from django.db import models
from django.db.models import Avg, Max

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

    # user specified a high school, but not test scores and gpa
    # Aggregate with averages of classmaets
    if u.high_school_name:
        classmates = Student.objects.filter(
            high_school_name=u.high_school_name)
        if not u.SAT and not u.ACT_composite:
            u.ACT_composite = int(
                classmates.aggregate(Avg("ACT_composite"))[
                    "ACT_composite__avg"]
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

    return all_students


def recommend_colleges(user_id, college_name):
    college = College.objects.get(name=college_name)
    applications = college.application_set.all().filter(questionable=False)  # ??
    
    n_pending = len(applications.filter(status='pending'))
    n_accepted = len(applications.filter(status='accepted'))
    n_waitlisted = len(applications.filter(status='waitlisted'))
    n_withdrawn = len(applications.filter(status='withdrawn'))
    n_deferred = len(applications.filter(status='deferred'))

    students = similar_students(user_id)

    sum_similary_score_pending = 0
    sum_similarity_score_accepted = 0
    sum_similary_score_waitlisted = 0
    sum_similarity_score_withdrawn = 0
    sum_similarity_score_deferred = 0

    for student in students:
        student_application = college.application_set.all().filter(
            questionable=False, student=student)
        if(len(student_application) == 1):

            student_application_status = student_application[0].status
            student_score = student.similar_score
            
            print("STUDENT SCORE")
            print(student_score)

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
                
    total_rank = 600
    rank_position = college.ranking
    college_r = 1 - (rank_position - 1) / total_rank
    
    
    accepted_ratio = sum_similarity_score_accepted/n_accepted if n_accepted > 0 else 0
    pending_ratio = sum_similary_score_pending/n_pending if n_pending > 0 else 0
    waitlisted_ratio = sum_similary_score_waitlisted/n_waitlisted if n_waitlisted > 0 else 0
    deferred_ratio = sum_similarity_score_deferred/n_deferred if n_deferred > 0 else 0
    withdrawn_ratio = sum_similarity_score_withdrawn/n_withdrawn if n_withdrawn > 0 else 0
    # print(accepted_ratio, pending_ratio, waitlisted_ratio, deferred_ratio, withdrawn_ratio)
    # print(n_accepted, n_pending, n_waitlisted, n_deferred, n_withdrawn)
    
    total_similarity = 0.7*accepted_ratio + 0.1*pending_ratio + 0.1*waitlisted_ratio + 0.05*deferred_ratio + 0.05*waitlisted_ratio
    result = 0.8*total_similarity + 0.2*college_r
    result = round(result*100)

    # for s in students[:50]:
    #    print(s.similar_score)
    return result


def similar_hs(hs_name):
    pass


def verify_acceptance_decision(app):
    pass
