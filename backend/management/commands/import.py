from django.core.management.base import BaseCommand, CommandError
from backend.models import College, Student, HighSchool
from backend.scrape import scrape_high_school, scrape_college_data
from faker import Faker
import random


def import_colleges():
    with open('backend/data/colleges.txt', 'r') as f:
        colleges_list = f.read().split('\n')
        for college_name in colleges_list:
            scrape_college_data(college_name)
        #    c = College(name=college_name)
        #    c.save()


def import_students():
    Faker.seed(random.randint(0,10000))
    fake = Faker()
    d = {}
    hs_list = HighSchool.objects.all()
    majors = []
    with open('backend/data/majors.txt', 'r') as f:
        majors = f.read().split('\n')

    for i in range(10000):
        d['userid'] = fake.user_name()
        d['password'] = fake.password(length=random.randint(8,20), special_chars=False)

        hs = random.choice(hs_list)
        d['high_school_name'] = hs.name
        d['high_school_city'] = hs.city
        d['high_school_state'] = hs.state
        d['residence_state'] = hs.state
        d['major_1'] = random.choice(majors)
        d['major_2'] = random.choice(majors)
        d['college_class'] = random.randint(2023,2028)
        d['GPA'] = min(random.gauss(3.0,0.4), 4.0)

        #https://www.act.org/content/dam/act/unsecured/documents/MultipleChoiceStemComposite.pdf
        d['ACT_composite'] = max(36, int(random.gauss(20.0, 5.8)))
        d['ACT_english'] = int(random.gauss(20.2, 7.0))
        d['ACT_math'] = int(random.gauss(20.5, 5.5))
        d['ACT_science'] = int(random.gauss(20.8, 5.7))
        d['ACT_reading'] = int(random.gauss(21.3, 6.8))

        #https://reports.collegeboard.org/pdf/2019-total-group-sat-suite-assessments-annual-report.pdf
        d['SAT_math'] = int(random.gauss(528, 117))
        d['SAT_EBRW'] = int(random.gauss(531, 103))

        #https://secure-media.collegeboard.org/sat/pdf/sat-subject-tests-percentile-ranks.pdf
        d['SAT_literature'] = int(random.gauss(614, 109))
        d['SAT_US_hist'] = int(random.gauss(647, 102))
        d['SAT_world_hist'] = int(random.gauss(629, 110))
        d['SAT_math_I'] = int(random.gauss(610, 109))
        d['SAT_math_II'] = int(random.gauss(698, 97))
        d['SAT_eco_bio'] = int(random.gauss(622, 109))
        d['SAT_mol_bio'] = int(random.gauss(654, 108))
        d['SAT_chemistry'] = int(random.gauss(668, 104))
        d['SAT_physics'] = int(random.gauss(671, 108))
        d['num_AP_passed'] = max(0, int(random.gauss(2, 2)))

        s = Student(**d)
        s.save()

def import_hs():
    with open('backend/data/hs.txt', 'r') as f:
        hs_urls = f.read().split('\n')
        for hs_url in hs_urls:
            try:
                d = scrape_high_school(hs_url)
            except Warning:
                print('Niche.com Wins again...')
                return

            hs = HighSchool(**d)
            if len(HighSchool.objects.filter(name=d['name'])) == 0:
                hs.save() 

class Command(BaseCommand):
    help = 'Import either the Student dataset or Colleges from college.txt'

    def add_arguments(self, parser):
        parser.add_argument('data_type', choices=['college', 'student', 'hs'])

    def handle(self, *args, **options):

        if options['data_type'] == 'college':
            self.stdout.write(self.style.SUCCESS('Importing Colleges'))
            import_colleges()
            self.stdout.write(self.style.SUCCESS('Importing Successful'))

        elif options['data_type'] == 'student':
            self.stdout.write(self.style.SUCCESS('Importing Students'))
            import_students()
        else:
            self.stdout.write(self.style.SUCCESS('Importing HS'))
            import_hs()
