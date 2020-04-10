import json
import random

from django.db import models
from django.db.models import Avg

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

    for s in all_students:
        hs = ap = gpa = composite = 0

        s.GPA = s.GPA or 0 
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
                composite = (s.ACT_composite - (s.ACT_composite - u.ACT_composite) / 2) / u.ACT_composite
            else:
                composite = (u.ACT_composite - (u.ACT_composite - s.ACT_composite) / 2) / s.ACT_composite

        if u.high_school_name is not None and s.high_school_name is not None:
            if u.high_school_name == s.high_school_name:
                hs = 1
            elif u.high_school_state == s.high_school_state:
                hs = 0.5

        if u.num_AP_passed is not None and s.num_AP_passed is not None:
            if u.num_AP_passed == s.num_AP_passed:
                ap = 1

        s.similar_score = hs + ap + composite + float(gpa) 

 
    #result.sort(key=lambda s: s.similar_score)
    #all_students = sorted(all_students,key=lambda s: s.similar_score) 
    all_students.order_by('-similar_score')

    return all_students

def recommend_colleges(user_id, college_name):
    c = College.objects.get(name = college_name)
    applications = c.application_set.all().filter(questionable=False)
    n_pending = len(applications.filter(status='pending'))
    n_accepted = len(applications.filter(status='accepted'))
    n_denied = len(applications.filter(status='denied'))
    n_waitlisted = len(applications.filter(status='waitlisted'))
    n_withdrawn = len(applications.filter(status='withdrawn'))
    n_deferred = len(applications.filter(status='deferred'))

    students = similar_students(user_id)
    #for s in students[:50]:
    #    print(s.similar_score)
    print(n_pending, n_accepted, n_denied, n_waitlisted, n_withdrawn, n_deferred) 
    return random.randint(0,100)

def similar_hs(hs_name):
    pass

def verify_acceptance_decision(app):
    pass
