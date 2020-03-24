from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Student
import json

# Create your views here

def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    s = Student.objects.filter(userid=userid)
    r = serializers.serialize('json', s, fields=('userid', 'high_school_name'))
    return JsonResponse(r, safe=False)

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
