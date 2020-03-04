from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index'),
    path('student/<slug:userid>/', views.student_profile, name='Student Profile')
]
