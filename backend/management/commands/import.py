from django.core.management.base import BaseCommand, CommandError
from backend.models import College, Student, HighSchool
from backend.scrape import scrape_high_school

def import_colleges():
    with open('backend/data/colleges.txt', 'r') as f:
        colleges_list = f.read().split('\n')
        for college_name in colleges_list:
            c = College(name=college_name)
            c.save()


def import_students():
    s = Student(userid="OMAR")
    s.save()

def import_hs():
    with open('backend/data/hs.txt', 'r') as f:
        hs_urls = f.read().split('\n')[191:]
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
