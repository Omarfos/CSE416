from . import views
from django.urls import path
from pathlib import Path


urlpatterns = [
    path("", views.index, name="index"),
    path("register/", views.register, name="Register"),
    path("login/", views.login_internal, name="Login"),
    path("logout/", views.logout_internal, name="Logout"),
    path("loginCheck/", views.check_if_login),
    path("search/", views.search, name="Search"),
    path("college/", views.college),
    path("college/<str:name>/", views.college, name="College"),
    path("college/<str:name>/applications", views.get_college_applications),
    path("student/<slug:userid>/", views.get_student_profile),
    path("student/<slug:userid>/edit/", views.post_student_profile),
    path("student/<slug:userid>/edit/application", views.post_student_application),
    path("similar/student/", views.get_similar_profiles),
    path("similar/hs/", views.get_similar_hs),
    path("recommend/", views.recommend),
]
