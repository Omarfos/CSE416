import json
import cProfile

from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.utils import IntegrityError
from django.db.models import Q
from django.db import transaction
from django.forms.models import model_to_dict

# from django.core.exceptions import DoesNotExist

from .models import Student, College, Application
from .algorithms import *
from .scrape import *


def index(request):
    return HttpResponse("Welcome to the Bingo API")


def register(request):
    """Register a user into the database.

    Parameters:
        request: POST, JSON 
        {userid, password, email='', first_name='', last_name=''} 

    Returns:
        400: invalid input
        SUCCESS: User is created successfuly
        ERROR: User already exists
    """
    try:
        d = json.loads(request.body)
        if "userid" not in d or "password" not in d:
            return JsonResponse({}, status=400)
        user = User.objects.create_user(d["userid"], password=d["password"])
        user.first_name = d.get("first_name", "")
        user.last_name = d.get("last_name", "")
        user.email = d.get("email", "")
        user.save()
        student = Student(userid=d["userid"])
        student.save()
    except IntegrityError:
        return JsonResponse({"ERROR": "User already exists"})
    except json.decoder.JSONDecodeError:
        return JsonResponse({}, status=400)

    return JsonResponse({"SUCCESS": "User Created"})

def login_internal(request):
    """Authenticates a user.

    Parameters:
        request: POST, JSON 
        {userid, password} 

    Returns:
        400: invalid input
        SUCCESS: User is logged in successfuly
        ERROR: Invalid credentials 
    """
    try:
        d = json.loads(request.body)
        if "userid" not in d or "password" not in d:
            return JsonResponse(status=400)
        user = authenticate(request, username=d["userid"], password=d["password"])
        if user is not None:
            request.session['userid'] = d["userid"]
            login(request, user)
            #request.session.modified = True
            #print(request.session.items())
            response = JsonResponse({"SUCCESS": "User logged in"})
            return response
        else:
            return JsonResponse({"ERROR": "Invalid User Name or Password"})

    except json.decoder.JSONDecodeError:
        return JsonResponse({}, status=400)


def college(request, name="Stony Brook University"):
    """Return JSON of specified college 

    Parameters:
        request: GET, JSON 
        url: college/<name>

    Returns:
        404: College not found
        College JSON
    """
    college = get_object_or_404(College, name=name)
    r = model_to_dict(college)
    return JsonResponse(r)


def get_college_applications(request, name):
    college = get_object_or_404(College, name=name)

    applications = college.application_set.all()
    response = []
    for app in applications:
        s = model_to_dict(app.student)
        s["status"] = app.status
        response.append(s)

    return JsonResponse(response, safe=False)


def get_student_profile(request, userid):
    """Return JSON of specified student 

    Parameters:
        request: GET, JSON 
        url: student/<name>

    Returns:
        404: Student not found
        Student JSON
    """
    print(request.session)
    s = get_object_or_404(Student, userid=userid)
    applications = []
    for app in s.application_set.all():
        applications.append(
            {
                "college": app.college.name,
                "status": app.status,
                "questionable": app.questionable,
            }
        )

    return JsonResponse(
        {"student": model_to_dict(s), "application": applications}, safe=False
    )


def post_student_profile(request, userid):
    #Add authenication 
    #print(request.user)
    s = get_object_or_404(Student, userid=userid)
    info = json.loads(request.body)
    if "high_school_name" in info:
        with transaction.atomic():
            if not HighSchool.objects.filter(name__icontains=info["high_school_name"]):
                hs = scrape_high_school([
                    {
                        "name": info["high_school_name"],
                        "city": info["high_school_city"],
                        "state": info["high_school_state"],
                    }
                ])
                if not hs:
                    return JsonResponse({"ERROR": "hs not found"}, status=400)
                HighSchool(**hs[0]).save()

    Student.objects.filter(userid=userid).update(**info)

    return JsonResponse({"SUCCESS": "User updated"})


def post_student_application(request, userid):
    #Add
    s = get_object_or_404(Student, userid=userid)
    s.application_set.all().delete()
    new_apps = json.loads(request.body)

    for app in new_apps:
        college = College.objects.get(name=app["college"])
        a = Application(
            student=s,
            college=college,
            status=app["status"],
            questionable=verify_acceptance_decision(userid, app),
        )
        app["questionable"] = a.questionable
        a.save()

    return JsonResponse(new_apps, safe=False)


def search(request):
    """Return colleges matching filter/search parameters of request

    Parameters:
        request: GET, JSON 
        url: search/?<params>

    Returns:
        colleges: if params are not specified
        colleges matching the parameters

    Supported filters:
        ranking, name, size, adm_rate, out_state_cost, SAT_math, SAT_EBRW,
        ACT_composite, states, majors, sort
    """
    params = request.GET
    query = Q()
    colleges = College.objects.all()
    lax = False

    if "lax" in params:
        if params["lax"] == "true":
            lax = True
    if "ranking" in params:
        low, high = tuple(params["ranking"].split(","))
        query = query & Q(ranking__range=(low, high))
        if lax:
            query = query | Q(ranking=None)
    if "name" in params:
        query = query & Q(name__icontains=params["name"])
        if lax:
            query = query | Q(name=None)
    if "size" in params:
        low, high = tuple(params["size"].split(","))
        query = query & Q(size__range=(low, high))
        if lax:
            query = query | Q(size=None)
    if "adm_rate" in params:
        low, high = tuple(params["adm_rate"].split(","))
        query = query & Q(adm_rate__range=(low, high))
        if lax:
            query = query | Q(adm_rate=None)
    if "out_state_cost" in params:
        low, high = tuple(params["out_state_cost"].split(","))
        query = query & Q(out_state_cost__range=(low, high))
        if lax:
            query = query | Q(out_state_cost=None)
    if "SAT_math" in params:
        low, high = tuple(params["SAT_math"].split(","))
        query = query & Q(SAT_math__range=(low, high))
        if lax:
            query = query | Q(SAT_math=None)
    if "SAT_EBRW" in params:
        low, high = tuple(params["SAT_EBRW"].split(","))
        query = query & Q(SAT_EBRW__range=(low, high))
        if lax:
            query = query | Q(SAT_EBRW=None)
    if "ACT_composite" in params:
        low, high = tuple(params["ACT_composite"].split(","))
        query = query & Q(ACT_composite__range=(low, high))
        if lax:
            query = query | Q(ACT_composite=None)
    if "states" in params:
        states_query = Q()
        for state in params["states"].split(","):
            states_query = states_query | Q(state=state)
        query = query & states_query
    if "majors" in params:
        major_query = Q()
        for major in params["majors"].split(","):
            major_query = major_query | Q(majors__icontains=major)
        query = query & major__query

    colleges = College.objects.filter(query)
    if "sort" in params:
        colleges = colleges.order_by(params["sort"])

    r = serializers.serialize("json", colleges)
    return JsonResponse(r, safe=False)


def recommend(request):
    params = request.GET
    colleges = json.loads(params["colleges"])
    userid = params["userid"]

    scores = recommend_colleges(userid, colleges)

    return JsonResponse(scores, safe=False)


def get_similar_hs(request):
    params = request.GET
    high_school = params["high_school"]
    high_school_city = params["high_school_city"]
    high_school_state = params["high_school_state"]

    with transaction.atomic():
        if not HighSchool.objects.filter(name__icontains=high_school):
            hs = scrape_high_school([
                {
                    "name": high_school,
                    "city": high_school_city,
                    "state": high_school_state,
                    }
                ])
            if not hs:
                return JsonResponse({}, status=400)
            HighSchool(**hs[0]).save()
        high_schools = similar_hs(high_school)

    return JsonResponse(high_schools[:10], safe=False)


def get_similar_profiles(request):
    params = request.GET
    userid = params["userid"]
    college = params["college"]
    college = College.objects.get(name=college)

    students = similar_students(userid)

    results = []
    for student in students:
        student_application = college.application_set.all().filter(
            questionable=False, student=student
        )
        if student_application:
            results.append(student)

    r = serializers.serialize("json", results)
    return JsonResponse(r, safe=False)
