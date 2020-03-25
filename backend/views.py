from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Student, College
from django.forms.models import model_to_dict
import json

# Create your views here

def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    print(userid)
    s = get_object_or_404(Student,userid=userid)
    r = model_to_dict(s)
    return JsonResponse(r)

def login(request):
    d = json.loads(request.body);
    student = get_object_or_404(Student, **d)
    return HttpResponse("User Found")

def register(request):
    d = json.loads(request.body);
    user = User.objects.create_user(d['userid'], password=d['password'])
    user.save()
    student = Student(**d)
    student.save()
    return HttpResponse("User Created")

def college(request, name):
    college = get_object_or_404(College, name=name)
    r = model_to_dict(college)
    return JsonResponse(r) 


