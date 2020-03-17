from django.contrib import admin
from .models import Student, Application, College, HighSchool
from .scrape import scrape_college_rankings
from import_export.admin import ImportExportModelAdmin

# Register your models here.

def import_college_rankings(modeladmin, request, queryset):
    for college in queryset:
        print(college.name)
        r = scrape_college_rankings(college.name)
        college.ranking = r
        college.save()


class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'ranking']
    actions = [import_college_rankings]


class ApplicationInline(admin.TabularInline):
    model = Application

class StudentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['userid']
    inlines = [ApplicationInline]

class HighSchoolAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'sat', 'act', 'grad_rate',
            'ap_enroll', 'num_students' ]

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['status']
    list_filter = ['status']



admin.site.register(Student, StudentAdmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(College, CollegeAdmin)
admin.site.register(HighSchool, HighSchoolAdmin)
