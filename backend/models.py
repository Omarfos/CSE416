from django.db import models

# Create your models here.


class Student(models.Model):
    userid = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    residence_state = models.CharField(max_length=50)
    high_school_name = models.CharField(max_length=50)
    high_school_city = models.CharField(max_length=50)
    college_class = models.CharField(max_length=50)

    def __str__(self):
        return self.userid


class Application(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f'Application status: {self.status}'


class College(models.Model):
    name = models.CharField(max_length=50)
    ranking = models.IntegerField(default=-1)


class HighSchool(models.Model):
    name = models.CharField(max_length=50)
    acceptance_rate = models.IntegerField()
