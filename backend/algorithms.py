import json
import random

from django.db import models
from django.db.models import Avg, Max
from django.forms.models import model_to_dict

from .models import *


def similar_students(userid, college):
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
        
    print("SIMILARITY SCORES", "major, hs, subject, ap, gpa, composite")
        
    # At this point, user has GPA, SAT, and ACT
    # User may have or not high school, number of AP, majors, subject SATs
    applications = college.application_set.all().filter(questionable=False)
    students_with_score = []
    for application in applications:
        s = application.student
        # s = Student.objects.get(userid=application.student)
        
        hs = ap = major = subject = gpa = composite = 0

        # similar gpa?
        s.GPA = s.GPA or 0
        gpa = (4.0 - float(abs(s.GPA - u.GPA))) / 4.0 if s.GPA != 0 else 0

        # similar composite?
        s.SAT = s.SAT or 0
        s.ACT_composite = s.ACT_composite or 0
        amount_count = 0
        if s.SAT != 0:
            composite = (1200 - float(abs (s.SAT - u.SAT))) / 1200
            amount_count += 1
        if s.ACT_composite != 0:
            amount_count += 1
            composite = composite + (35 - float(abs (s.ACT_composite - u.ACT_composite))) / 35
            composite = composite / amount_count
        # composite = max ((1200 - float(abs (s.SAT - u.SAT))) / 1200, (35 - float(abs (s.ACT_composite - u.ACT_composite))) / 35) if s.SAT != 0 and s.ACT_composite != 0 else 0

        # similar high school?
        northeast = ["ME", "NH", "VT", "MA", "NY", "RI", "CT", "PA", "NJ"]
        midwest = ["OH", "MI", "IN", "WI", "IL", "MI", "IA", "MO", "ND", "SD", "NE", "KS", "MN"]
        west = ["MT", "ID", "WY", "CO", "NM", "AZ", "UT", "NV", "CA", "OR", "WA", "AK", "HI"]
        south = ["TX", "OK", "AR", "LA", "MS", "AL", "TN", "GA", "FL", "KY", "SC", "NC", "VA", "WV", "DC", "MD", "DE"]
        regions = [northeast, midwest, west, south]
        if u.high_school_name is not None and s.high_school_name is not None:
            if u.high_school_name == s.high_school_name:
                hs = 1
            elif u.high_school_state == s.high_school_state:
                hs = 0.5
            else:
                for region in regions:
                    if u.high_school_state in region and s.high_school_state in region:
                        hs = 0.25
                        break 

        # similar AP?
        u.num_AP_passed = u.num_AP_passed or 0
        s.num_AP_passed = s.num_AP_passed or 0
        ap = min(u.num_AP_passed, s.num_AP_passed) / max(u.num_AP_passed, s.num_AP_passed) if u.num_AP_passed != 0 and s.num_AP_passed != 0 else 0
        
        # similar major?
        major_set = [s.major_1, s.major_2]
        if u.major_1 in major_set or u.major_2 in major_set:
            major = 1
            
        # similar SAT subject?
        subject_pairs = [[u.SAT_literature, s.SAT_literature], [u.SAT_US_hist, s.SAT_US_hist], [u.SAT_world_hist, s.SAT_world_hist], [u.SAT_math_I, s.SAT_math_I], [u.SAT_math_II, s.SAT_math_II], [u.SAT_eco_bio, s.SAT_eco_bio], [u.SAT_mol_bio, s.SAT_mol_bio], [u.SAT_chemistry, s.SAT_chemistry], [u.SAT_physics, s.SAT_physics]]
        number_of_same_taken = 0
        for pair in subject_pairs:
            pair[0] = pair[0] or 0
            pair[1] = pair[1] or 0
            if(pair[0] != 0 and pair[1] != 0):
                subject = subject*number_of_same_taken + (600 - float(abs (pair[1] - pair[0]))) / 600
                number_of_same_taken += 1
                subject = subject / number_of_same_taken
  
        s.similar_score = (0.05*major + 0.10*subject + 0.05*hs + 0.05*ap + 0.2*gpa + 0.2*composite) / (0.05 + 0.10 + 0.05 + 0.05 + 0.2 + 0.2)
        students_with_score.append(s)

        print(s.userid, 'Similarity Score:', s.similar_score,'Before Weights:', major, subject, hs, ap, gpa, composite, 'After Weights:', 0.05*major, 0.10*subject, 0.05*hs, 0.05*ap, 0.2*gpa, 0.2*composite)

    #result.sort(key=lambda s: s.similar_score)
    #all_students = sorted(all_students,key=lambda s: s.similar_score)
    # students_with_score.order_by('-similar_score')
    students_with_score.sort(key=lambda x: x.similar_score, reverse=True)

    return students_with_score[:100]


def recommend_colleges(user_id, colleges):
    scores = []

    for college in colleges:
        college = College.objects.get(name=college)
        students = similar_students(user_id, college)
        
        n_pending = 0
        n_accepted = 0
        n_waitlisted = 0
        n_withdrawn = 0
        n_deferred = 0
        
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
                    n_accepted += 1
                elif(student_application_status == "pending"):
                    sum_similary_score_pending += student_score
                    n_pending += 1
                elif(student_application_status == "waitlisted"):
                    sum_similary_score_waitlisted += student_score
                    n_waitlisted += 1
                elif(student_application_status == "withdrawn"):
                    sum_similarity_score_withdrawn += student_score
                    n_withdrawn += 1
                elif(student_application_status == "deferred"):
                    sum_similarity_score_deferred += student_score
                    n_deferred += 1

            except Application.DoesNotExist:
                continue
                    
        total_rank = 600
        rank_position = college.ranking or 601
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
