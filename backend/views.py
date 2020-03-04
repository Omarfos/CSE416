from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.shortcuts import get_object_or_404
from .models import Student


# Create your views here

def index(request):
    return HttpResponse("Hello World")


def student_profile(request, userid):
    s = Student.objects.filter(userid=userid)
    r = serializers.serialize('json', s, fields=('userid', 'high_school_name'))
    return JsonResponse(r, safe=False)
