from . import views
from django.urls import path
from pathlib import Path


urlpatterns = [
    path("", views.index, name="index"),
    path("register/", views.register, name="Register"),
    path("login/", views.login_internal, name="Login"),
    path("search/", views.search, name="Search"),
    path("college/", views.college),
    path("college/<str:name>/", views.college, name="College"),
    path("student/<slug:userid>/", views.get_student_profile),
    path("student/<slug:userid>/edit/general", views.post_student_profile),
    path("similar/", views.get_similar_profiles),
    path("recommend/", views.recommend)
]
