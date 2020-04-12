from django.core.management.base import BaseCommand, CommandError
from backend.models import College, Student, HighSchool, Application
from backend.scrape import scrape_high_school, scrape_college_data
from faker import Faker
import random


def import_colleges():
    with open("backend/data/colleges.txt", "r") as f:
        colleges_list = f.read().split("\n")
        for college_name in colleges_list:
            print(college_name)
            # scrape_college_data(college_name)
            c = College(name=college_name)
            c.save()


def import_students():
    fake = Faker()
    d = {}
    hs_list = HighSchool.objects.all()
    college_list = College.objects.all()

    status = [
        "pending",
        "accepted",
        "denied",
        "deferred",
        "waitlisted",
        "withdrawn",
    ]

    majors = []
    with open("backend/data/majors.txt", "r") as f:
        majors = f.read().split("\n")

    for i in range(1000):
        d["userid"] = fake.user_name()
        d["password"] = fake.password(length=random.randint(8, 20), special_chars=False)

        hs = random.choice(hs_list)
        d["high_school_name"] = hs.name
        d["high_school_city"] = hs.city
        d["high_school_state"] = hs.state
        d["residence_state"] = hs.state
        d["major_1"] = random.choice(majors)
        d["major_2"] = random.choice(majors)
        d["college_class"] = random.randint(2023, 2028)

        # Calculate academic quality metric to make scores depentent, otherwise
        # we can have a student with SAT 1600 and 2.0 GPA.
        quality = random.gauss(0,0.1) * 3

        d["GPA"] = min(random.gauss(3.0 + quality * 1.0, 0.2), 4.0)

        act = lambda mean, std: max(1, min(36, int(random.gauss(mean + mean*quality, std))))
        sat = lambda mean, std: max(400, min(800, int(random.gauss(mean + mean*quality, std))))

        # https://www.act.org/content/dam/act/unsecured/documents/MultipleChoiceStemComposite.pdf
        d["ACT_composite"] = act(21.0, 5.8)
        d["ACT_english"] = act(21.2, 7.0)
        d["ACT_math"] = act(21.5, 5.5)
        d["ACT_science"] = act(21.8, 5.7)
        d["ACT_reading"] = act(22.3, 6.8)

        # https://reports.collegeboard.org/pdf/2019-total-group-sat-suite-assessments-annual-report.pdf
        d["SAT_math"] = sat(528, 117)
        d["SAT_EBRW"] = sat(531, 103)
        d["SAT"] = d["SAT_math"] + d["SAT_EBRW"] 

        # https://secure-media.collegeboard.org/sat/pdf/sat-subject-tests-percentile-ranks.pdf
        d["SAT_literature"] = sat(614, 109)
        d["SAT_US_hist"] = sat(647, 102)
        d["SAT_world_hist"] = sat(629, 110)
        d["SAT_math_I"] = sat(610, 109)
        d["SAT_math_II"] = sat(698, 97)
        d["SAT_eco_bio"] = sat(622, 109)
        d["SAT_mol_bio"] = sat(654, 108)
        d["SAT_chemistry"] = sat(668, 104)
        d["SAT_physics"] = sat(671, 108)
        d["num_AP_passed"] = max(0, int(quality * 10))

        s = Student(**d)
        s.high_school = hs
        try:
            s.save()
        except:
            continue
        
        colleges = random.sample(list(college_list), random.randint(5,15))
        for c in colleges:
            a = Application()
            a.college = c
            a.status = random.choice(status)
            a.student = s
            a.questionable = True if random.random() < 0.05 else False
            a.save()


def import_hs():
    with open("backend/data/hs.txt", "r") as f:
        hs_urls = f.read().split("\n")
        for hs_url in hs_urls:
            try:
                d = scrape_high_school(hs_url)
            except Warning:
                print("Niche.com Wins again...")
                return

            hs = HighSchool(**d)
            if len(HighSchool.objects.filter(name=d["name"])) == 0:
                hs.save()


class Command(BaseCommand):
    help = "Import either the Student dataset or Colleges from college.txt"

    def add_arguments(self, parser):
        parser.add_argument("data_type", choices=["college", "student", "hs"])

    def handle(self, *args, **options):

        if options["data_type"] == "college":
            self.stdout.write(self.style.SUCCESS("Importing Colleges"))
            import_colleges()
            self.stdout.write(self.style.SUCCESS("Importing Successful"))

        elif options["data_type"] == "student":
            self.stdout.write(self.style.SUCCESS("Importing Students"))
            import_students()
            self.stdout.write(self.style.SUCCESS("Importing Successful"))

        else:
            self.stdout.write(self.style.SUCCESS("Importing HS"))
            import_hs()
            self.stdout.write(self.style.SUCCESS("Importing Successful"))
