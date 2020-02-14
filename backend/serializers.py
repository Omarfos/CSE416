from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ['userid', 'password', 'residence_state',
                  'high_school_name', 'high_school_city', 'college_class']
