from django.http import HttpResponse, JsonResponse, HttpRequest
from django.core import serializers
from django.shortcuts import get_object_or_404
from .models import Student
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django import forms
import json

class NameForm(forms.Form):
    userid = forms.CharField(label='userid', max_length=100)
    password = forms.CharField(label='userid', max_length=100)

# Create your views here

def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    s = Student.objects.filter(userid=userid)
    r = serializers.serialize('json', s, fields=('userid', 'high_school_name'))
    return JsonResponse(r, safe=False)

@csrf_exempt
def create_profile(request):
    print("REQUEST BODY")
    print(request.body)
    d = json.loads(request.body);
    print(request.body)
    print(d)
    return HttpResponse("Creating Profile for")
