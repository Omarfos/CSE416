from rest_framework import viewsets
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import StudentSerializer
from .models import Student

# Create your views here


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


# def index(request):
#     return HttpResponse("Hello, you are at the index")
