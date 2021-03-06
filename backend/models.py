from django.db import models


class HighSchool(models.Model):
    name = models.CharField(max_length=100, unique=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    sat = models.IntegerField(null=True, blank=True)
    act = models.IntegerField(null=True, blank=True)
    num_students = models.IntegerField(null=True, blank=True)

    grad_rate = models.FloatField(null=True, blank=True)
    ap_enroll = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Student(models.Model):
    userid = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, null=True)
    residence_state = models.CharField(max_length=2, null=True, blank=True)

    high_school_name = models.CharField(max_length=100, null=True, blank=True)
    high_school_city = models.CharField(max_length=100, null=True, blank=True)
    high_school_state = models.CharField(max_length=2, null=True, blank=True)
    major_1 = models.CharField(max_length=100, null=True, blank=True)
    major_2 = models.CharField(max_length=100, null=True, blank=True)

    GPA = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

    college_class = models.IntegerField(null=True, blank=True)
    ACT_English = models.IntegerField(null=True, blank=True)
    ACT_math = models.IntegerField(null=True, blank=True)
    ACT_reading = models.IntegerField(null=True, blank=True)
    ACT_science = models.IntegerField(null=True, blank=True)
    ACT_composite = models.IntegerField(null=True, blank=True)
    SAT = models.IntegerField(null=True, blank=True)
    SAT_math = models.IntegerField(null=True, blank=True)
    SAT_EBRW = models.IntegerField(null=True, blank=True)
    SAT_literature = models.IntegerField(null=True, blank=True)
    SAT_US_hist = models.IntegerField(null=True, blank=True)
    SAT_world_hist = models.IntegerField(null=True, blank=True)
    SAT_math_I = models.IntegerField(null=True, blank=True)
    SAT_math_II = models.IntegerField(null=True, blank=True)
    SAT_eco_bio = models.IntegerField(null=True, blank=True)
    SAT_mol_bio = models.IntegerField(null=True, blank=True)
    SAT_chemistry = models.IntegerField(null=True, blank=True)
    SAT_physics = models.IntegerField(null=True, blank=True)
    num_AP_passed = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.userid}"


class College(models.Model):

    INS_TYPE = [
        ("Public", "Public"),
        ("Private nonprofit", "Private nonprofit"),
        ("Private for-profit", "Private for-profit"),
    ]

    name = models.CharField(max_length=100, unique=True)
    ranking = models.IntegerField(null=True, blank=True)
    adm_rate = models.FloatField(null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    SAT_math = models.IntegerField(null=True, blank=True)
    SAT_EBRW = models.IntegerField(null=True, blank=True)
    ACT_composite = models.IntegerField(null=True, blank=True)
    in_state_cost = models.IntegerField(null=True, blank=True)
    out_state_cost = models.IntegerField(null=True, blank=True)
    institution_type = models.CharField(max_length=30, choices=INS_TYPE, blank=True)
    grad_debt_median = models.IntegerField(null=True, blank=True)
    completion_rate = models.FloatField(null=True, blank=True)
    state = models.CharField(max_length=2, null=True, blank=True)
    majors = models.CharField(max_length=2048, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Application(models.Model):
    APP_STATUS = [
        ("pending", "pending"),
        ("accepted", "accepted"),
        ("denied", "denied"),
        ("deferred", "deferred"),
        ("waitlisted", "waitlisted"),
        ("withdrawn", "withdrawn"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=APP_STATUS)
    questionable = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student} application for {self.college}: {self.status}"

class Savedsearch(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f"{self.student} saved search for {self.name}: {self.url}"
