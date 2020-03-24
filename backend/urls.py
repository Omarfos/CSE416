from . import views
from django.urls import path
from pathlib import Path


urlpatterns = [
    path('', views.index, name='index'),
    path('student/<slug:userid>/', views.student_profile, name='Student Profile'),
    path('login', views.login, name='Login'),
    path('register', views.register, name='Register')
]

