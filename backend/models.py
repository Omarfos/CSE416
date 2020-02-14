from django.db import models

# Create your models here.


class Student(models.Model):
    userid = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    residence_state = models.CharField(max_length=50)
    high_school_name = models.CharField(max_length=50)
    high_school_city = models.CharField(max_length=50)
    # high_school_state =
    college_class = models.CharField(max_length=50)

    def __str__(self):
        return self.userid
