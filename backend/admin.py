from django.contrib import admin
from .models import Student, Application, College, HighSchool
from .scrape import scrape_college_rankings

# Register your models here.

def import_college_rankings(modeladmin, request, queryset):
    for college in queryset:
        print(college.name)
        r = scrape_college_rankings(college.name)
        college.ranking = r
        college.save()


# scrape_college_rankings.short_description = "College Rankings Scraped"

class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'ranking']
    actions = [import_college_rankings]


class StudentAdmin(admin.ModelAdmin):
    list_display = ['userid']

class HighSchoolAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'sat', 'act', 'grad_rate', 'ap_enroll' ]



admin.site.register(Student, StudentAdmin)
admin.site.register(Application)
admin.site.register(College, CollegeAdmin)
admin.site.register(HighSchool, HighSchoolAdmin)
