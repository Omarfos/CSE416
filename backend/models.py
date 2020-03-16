from django.db import models

# Create your models here.


class Student(models.Model):
    userid = models.CharField(max_length=100, default='Olesia')
    password = models.CharField(max_length=100, default='Olesia123')
    residence_state = models.CharField(max_length=100, default='NY')
    high_school_name = models.CharField(max_length=100, default='Stuyvesant')
    high_school_city = models.CharField(max_length=100, default='NYC')
    high_school_state = models.CharField(max_length=100, default="New York")
    major_1 = models.CharField(max_length=100, default="CS")
    major_2 = models.CharField(max_length=100, default="AMS")

    GPA = models.FloatField(default=3.0)

    college_class = models.IntegerField(default=2020)
    SAT_math = models.IntegerField(default=-1)
    SAT_EBRW = models.IntegerField(default=-1)
    ACT_English = models.IntegerField(default=-1)
    ACT_math = models.IntegerField(default=-1)
    ACT_reading = models.IntegerField(default=-1)
    ACT_science = models.IntegerField(default=-1)
    ACT_composite = models.IntegerField(default=-1)
    SAT_literature = models.IntegerField(default=-1)
    SAT_US_hist = models.IntegerField(default=-1)
    SAT_world_hist = models.IntegerField(default=-1)
    SAT_math_I = models.IntegerField(default=-1)
    SAT_math_II = models.IntegerField(default=-1)
    SAT_eco_bio = models.IntegerField(default=-1)
    SAT_mol_bio = models.IntegerField(default=-1)
    SAT_chemistry = models.IntegerField(default=-1)
    SAT_physics = models.IntegerField(default=-1)
    num_AP_passed = models.IntegerField(default=-1)

    def __str__(self):
        return self.userid


class College(models.Model):
    name = models.CharField(max_length=100, unique=True)
    ranking = models.CharField(max_length=10)


class Application(models.Model):
    APP_STATUS = [
            ('pending','pending'),
            ('accepted','accepted'),
            ('denied','denied'),
            ('deferred','deferred'),
            ('wait','wait'),
            ('listed','listed'),
            ('withdrawn','withdrawn')
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=10, choices=APP_STATUS, null=True)

    def __str__(self):
        return f'Application '


class HighSchool(models.Model):
    name = models.CharField(max_length=100, unique=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    sat = models.IntegerField(default=1000,null=True, blank=True)
    act = models.IntegerField(null=True, blank=True)
    num_students = models.IntegerField(null=True, blank=True)

    grad_rate = models.FloatField(null=True, blank=True)
    ap_enroll = models.FloatField(null=True, blank=True)

