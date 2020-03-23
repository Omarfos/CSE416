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

def create_profile(request):
    d = json.loads(request.body);
    student = get_object_or_404(Student, **d)
    return HttpResponse("User Found")
