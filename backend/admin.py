from django.contrib import admin
from .models import Student, Application, College, HighSchool
from .scrape import scrape_college_rankings

# Register your models here.

def add_arguments(self, parser):
    parser.add_argument('poll_ids', nargs='+', type=int)

    def handle(self, *args, **options):
        for poll_id in options['poll_ids']:
            try:
                poll = Poll.objects.get(pk=poll_id)
            except Poll.DoesNotExist:
                raise CommandError('Poll "%s" does not exist' % poll_id)

            poll.opened = False
            poll.save()

            self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))



def import_colleges(modeladmin, request, queryset):
    with open('colleges.txt', 'r') as f:
        colleges_list = f.read().split('\n')
        for college_name in colleges_list:
            c = College(name=college_name)
            c.save()


def import_college_rankings(modeladmin, request, queryset):
    for college in queryset:
        print(college.name)
        r = scrape_college_rankings(college.name)
        college.ranking = r
        college.save()


def scrape_high_school(modeladmin, request, queryset):
    queryset.update(acceptance_rate=69)
    print('hello')


def import_students(modeladmin, request, queryset):
    for i in range(10):
        name = "Olesia " + str(i)
        s = Student(userid=name)
        s.save()


# scrape_college_rankings.short_description = "College Rankings Scraped"

class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'ranking']
    actions = [import_colleges, import_college_rankings]


class StudentAdmin(admin.ModelAdmin):
    list_display = ['userid']
    actions = [import_students]


class HighSchoolAdmin(admin.ModelAdmin):
    actions = [scrape_high_school]


admin.site.register(Student, StudentAdmin)
admin.site.register(Application)
admin.site.register(College, CollegeAdmin)
admin.site.register(HighSchool, HighSchoolAdmin)
