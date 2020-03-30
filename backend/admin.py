from django.contrib import admin
from .models import Student, Application, College, HighSchool
from .scrape import *
from import_export.admin import ImportExportModelAdmin


def import_college_score_card(modeladmin, request, queryset):
    r = scrape_college_score_card([college.name for college in queryset])
    for college in r:
        College.objects.filter(name=college["name"]).update(**college)


def import_college_rankings(modeladmin, request, queryset):
    r = scrape_college_rankings([college.name for college in queryset])
    print(r)
    for name, ranking in r.items():
        c = College.objects.get(name=name)
        c.ranking = ranking
        c.save()


def import_college_data(modeladmin, request, queryset):
    r = scrape_college_data([college.name for college in queryset])
    print(r)
    for college in r:
        College.objects.filter(name=college["name"]).update(**college)


def import_niche_data(modeladmin, request, queryset):
    r = scrape_high_school(
        [{"name": hs.name, "city": hs.city, "state": hs.state} for hs in queryset]
    )
    for hs in r:
        HighSchool.objects.filter(name=hs["name"]).update(**hs)


class CollegeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = [
        "name",
        "state",
        "ranking",
        "institution_type",
        "size",
        "adm_rate",
        "SAT_math",
        "SAT_EBRW",
        "ACT_composite",
        "in_state_cost",
        "out_state_cost",
        "grad_debt_median",
        "completion_rate",
    ]

    actions = [import_college_rankings, import_college_data, import_college_score_card]


class ApplicationInline(admin.TabularInline):
    list_display = ["status"]
    model = Application


class StudentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = [
        "userid",
        "high_school_name",
        "high_school_city",
        "high_school_state",
        "GPA",
        "SAT_EBRW",
        "ACT_composite",
    ]
    inlines = [ApplicationInline]


class HighSchoolAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = [
        "name",
        "city",
        "state",
        "sat",
        "act",
        "grad_rate",
        "ap_enroll",
        "num_students",
    ]
    actions = [import_niche_data]


class ApplicationAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ["status", "college", "student"]
    list_filter = ["status"]
    pass


admin.site.register(Student, StudentAdmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(College, CollegeAdmin)
admin.site.register(HighSchool, HighSchoolAdmin)
