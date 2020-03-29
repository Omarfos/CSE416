import json
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.utils import IntegrityError
from django.forms.models import model_to_dict
from django.db.models import Q
from .models import Student, College


def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    s = get_object_or_404(Student, userid=userid)
    r = model_to_dict(s)
    return JsonResponse(r)


def login_internal(request):
    try:
        d = json.loads(request.body)
        if 'userid' not in d or 'password' not in d:
            return JsonResponse(status=400)
        user = authenticate(
            request, username=d['userid'], password=d['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({"SUCCESS": "User logged in"})
        else:
            return JsonResponse({"ERROR": "Invalid User Name or Password"})

    except json.decoder.JSONDecodeError:
        return JsonResponse(status=400)


def register(request):

    try:
        d = json.loads(request.body)
        if 'userid' not in d or 'password' not in d:
            return JsonResponse(status=400)
        user = User.objects.create_user(d['userid'], password=d['password'])
        user.first_name = d.get('first_name', '')
        user.last_name = d.get('last_name', '')
        user.email = d.get('email', '')
        user.save()
        student = Student(userid=d['userid'])
        student.save()
    except IntegrityError:
        return JsonResponse({"ERROR": "User already exists"})
    except json.decoder.JSONDecodeError:
        return JsonResponse(status=400)

    return JsonResponse({"SUCCESS": "User Created"})


def college(request, name):
    college = get_object_or_404(College, name=name)
    r = model_to_dict(college)
    return JsonResponse(r)


def search(request):
    params = request.GET
    q = College.objects.all()
    if 'ranking' in params:
        low, high = tuple(params['ranking'].split(','))
        q = q.filter(ranking__range=(low, high))
    if 'name' in params:
        q = q.filter(name__icontains=params['name'])
    if 'size' in params:
        low, high = tuple(params['size'].split(','))
        q = q.filter(size__range=(low, high))
    if 'adm_rate' in params:
        low, high = tuple(params['adm_rate'].split(','))
        q = q.filter(adm_rate__range=(low, high))
    if 'out_state_cost' in params:
        low, high = tuple(params['out_state_cost'].split(','))
        q = q.filter(out_state_cost__range=(low, high))
    if 'SAT_math' in params:
        low, high = tuple(params['SAT_math'].split(','))
        q = q.filter(SAT_math__range=(low, high))
    if 'SAT_EBRW' in params:
        low, high = tuple(params['SAT_EBRW'].split(','))
        q = q.filter(SAT_EBRW__range=(low, high))
    if 'ACT_composite' in params:
        low, high = tuple(params['ACT_composite'].split(','))
        q = q.filter(ACT_composite__range=(low, high))
    if 'states' in params:
        query = Q()
        for state in params['states'].split(','):
            query = query | Q(state=state)
        q = q.filter(query)
    if 'majors' in params:
        query = Q()
        for major in params['majors'].split(','):
            print(major)
            query = query | Q(majors__icontains=major)
        q = q.filter(query)

    if 'sort' in params:
        q = q.order_by(params['sort'])

    #l = json.loads(query[0].majors)
    # print(l[0])
    r = serializers.serialize('json', q)
    return JsonResponse(r, safe=False)
