from django.contrib import admin
from .models import Student, Application, College, HighSchool
from .scrape import scrape_college_rankings

# Register your models here.


def import_colleges(modeladmin, request, queryset):
    with open('colleges.txt', 'r') as f:
        colleges_list = f.read().split('\n')
        for college_name in colleges_list:
            c = College(name=college_name)
            c.save()


def import_college_rankings(modeladmin, request, queryset):
    for college in queryset:
        r = scrape_college_rankings(college.name)
        queryset.update(ranking=r)

    print('hello')


def scrape_high_school(modeladmin, request, queryset):
    queryset.update(acceptance_rate=69)
    print('hello')


# scrape_college_rankings.short_description = "College Rankings Scraped"


class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'ranking']
    actions = [import_colleges, import_college_rankings]


class HighSchoolAdmin(admin.ModelAdmin):
    actions = [scrape_high_school]


admin.site.register(Student)
admin.site.register(Application)
admin.site.register(College, CollegeAdmin)
admin.site.register(HighSchool, HighSchoolAdmin)
