from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.utils import IntegrityError
from .models import Student, College
from django.forms.models import model_to_dict
# Create your views here
import json


def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    print(userid)
    s = get_object_or_404(Student,userid=userid)
    r = model_to_dict(s)
    return JsonResponse(r)

def login_internal(request):
    try:
        d = json.loads(request.body)
        if 'userid' not in d or 'password' not in d:
            return HttpResponse(status=400)
        user = authenticate(request, username=d['userid'], password=d['password'])
        if user is not None:
             login(request, user)
        else:
            return HttpResponse("ERROR: Invalid User Name or Password")

    except json.decoder.JSONDecodeError:
        return HttpResponse(status=400)

    return HttpResponse("SUCCESS: User logged in")

def register(request):


    try:
        d = json.loads(request.body)
        if 'userid' not in d or 'password' not in d:
            return HttpResponse(status=400)
        user = User.objects.create_user(d['userid'], password=d['password'])
        user.first_name = d.get('first_name', '')
        user.last_name = d.get('last_name', '')
        user.email = d.get('email', '')
        user.save()
        student = Student(userid=d['userid'])
        student.save()
    except IntegrityError: 
        return HttpResponse("ERROR: User already exists")
    except json.decoder.JSONDecodeError:
        return HttpResponse(status=400)


    return HttpResponse("SUCCESS: User Created")

def college(request, name):
    college = get_object_or_404(College, name=name)
    r = model_to_dict(college)
    return JsonResponse(r) 


