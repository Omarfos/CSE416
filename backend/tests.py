import json
import os
import time

from django.test import TestCase, LiveServerTestCase
from django.test import Client
from django.test import RequestFactory
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from .models import *
from .views import *
from .scrape import *
from .algorithms import *


class RegisterTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register(self):
        r = self.client.post(
            "/register/",
            {"userid": "john", "password": "smith"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertTrue("SUCCESS" in r.json())

    def test_register_invalid_input(self):
        r = self.client.post(
            "/register/",
            {"usri": "john", "pass": "smith"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 400)

    def test_register_user_already_exists(self):
        Student.objects.create(userid="john")
        r = self.client.post(
            "/register/",
            {"userid": "john", "password": "smith"},
            content_type="application/json",
        )
        self.assertEqual(r.json()["ERROR"], "User already exists")


class LoginTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="bonya", password="meow")

    def test_login_valid_creds(self):
        r = self.client.post(
            "/login/",
            {"userid": "bonya", "password": "meow"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("SUCCESS", ""), "User logged in")

    def test_login_invalid_creds(self):
        r = self.client.post(
            "/login/",
            {"userid": "bonya", "password": "soRussian"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("ERROR", ""), "Invalid User Name or Password")


class StudentProfileTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.student = Student.objects.create(userid="Bonya", major_1="Felinology")

    def test_view_profile(self):
        r = self.client.get("/student/Bonya/")
        self.assertEqual(r.status_code, 200)
        print(r.json())
        self.assertEqual(r.json()["student"]["major_1"], "Felinology")

    def test_invalid_view_profile(self):
        r = self.client.get("/student/Olesia/")
        self.assertEqual(r.status_code, 404)


class SearchTests(TestCase):
    def setUp(self):
        College.objects.create(
            name="Columbia", out_state_cost=70000, ranking=1, state="NY"
        )
        College.objects.create(
            name="Stony", out_state_cost=20000, ranking=3, state="NY"
        )
        College.objects.create(name="NYU", out_state_cost=65000, ranking=2, state="NY")

    def test_search_sort(self):
        r = self.client.get("/search/?sort=ranking")
        colleges = [c["fields"]["name"] for c in json.loads(r.json())]
        self.assertEqual(r.status_code, 200)
        self.assertListEqual(colleges, ["Columbia", "NYU", "Stony"])

    def test_search_range(self):
        r = self.client.get("/search/?out_state_cost=65000,70000")
        colleges = [c["fields"]["name"] for c in json.loads(r.json())]
        self.assertListEqual(colleges, ["Columbia", "NYU"])

    def test_search_location(self):
        College.objects.create(name="Berkley", state="CA")
        College.objects.create(name="Princeton", state="NJ")

        r = self.client.get("/search/?states=CA,NJ")
        colleges = [c["fields"]["name"] for c in json.loads(r.json())]
        self.assertListEqual(colleges, ["Berkley", "Princeton"])

        r = self.client.get("/search/?states=NY")
        colleges = [c["fields"]["name"] for c in json.loads(r.json())]
        self.assertCountEqual(colleges, ["Columbia", "NYU", "Stony"])


# Scraping tests
class ScrapeCollegeRankingsTests(TestCase):
    def test_scrape_colleges(self):
        colleges = [
            "Harvard University",
            "Cornell University",
            "Columbia University",
            "New York University",
            "Stony Brook University",
        ]
        ranking_dict = {
            "Harvard University": 1,
            "Cornell University": 9,
            "Columbia University": 15,
            "New York University": 31,
            "Stony Brook University": 105,
        }

        r = scrape_college_rankings(colleges)
        self.assertDictEqual(r, ranking_dict)

class ScrapeCollegeScoreCardTests(TestCase):
    def test_scrape_colleges(self):
        colleges = ["Stony Brook University"]
        expected = [
            {
                "name": "Stony Brook University",
                "size": 17407,
                "grad_debt_median": 19000.0,
                "adm_rate": 0.4198,
                "institution_type": "Public",
                "state": "NY",
            }
        ]
        r = scrape_college_score_card(colleges)
        self.assertListEqual(r, expected)


class ScrapeCollegeDataTests(TestCase):
    def test_scrape_colleges(self):
        colleges = ["Stony Brook University"]
        expected = [
            {
                "name": "Stony Brook University",
                "majors": [
                    "African-American/Black Studies",
                    "American/United States Studies/Civilization",
                    "Anthropology",
                    "Applied Mathematics, General",
                    "Art History, Criticism and Conservation",
                    "Art/Art Studies, General",
                    "Asian Studies/Civilization",
                    "Astronomy",
                    "Athletic Training/Trainer",
                    "Atmospheric Sciences and Meteorology, General",
                    "Biochemistry",
                    "Bioengineering and Biomedical Engineering",
                    "Biological and Physical Sciences",
                    "Biology/Biological Sciences, General",
                    "Business Administration and Management, General",
                    "Chemical and Biomolecular Engineering",
                    "Chemistry, General",
                    "Chemistry, Other",
                    "Civil Engineering, General",
                    "Clinical Laboratory Science/Medical Technology/Technologist",
                    "Comparative Literature",
                    "Computer and Information Sciences, General",
                    "Drama and Dramatics/Theatre Arts, General",
                    "Ecology",
                    "Economics, General",
                    "Electrical and Electronics Engineering",
                    "Engineering, General",
                    "English Language and Literature, General",
                    "Environmental Design/Architecture",
                    "Environmental Studies",
                    "European Studies/Civilization",
                ],
                "SAT_math": 675,
                "SAT_EBRW": 671,
                "ACT_composite": 28,
                "in_state_cost": 26091,
                "out_state_cost": 43761,
                "completion_rate": 52.8,
            }
        ]
        r = scrape_college_data(colleges)
        test_r = []
        for entry in r:
            entry["majors"] = json.loads(entry["majors"])
            test_r.append(entry)
        self.assertListEqual(test_r, expected)


class ScrapeNicheTests(TestCase):
    def test_one(self):
        hs = [{"name": "Whitney High School", "city": "cerritos", "state": "CA"}]
        expected = [
            {
                "name": "Whitney High School",
                "city": "Cerritos",
                "state": "CA",
                "grad_rate": 0.95,
                "sat": 1400,
                "act": 32,
                "ap_enroll": 0.600883,
                "num_students": 1011,
            }
        ]
        r = scrape_high_school(hs)
        self.assertListEqual(r, expected)

# AlgorithmsTest

class SimilarStudentsTests(TestCase):
    #fixtures = ['test_data.json']
    def setUp(self):
        Student.objects.create(userid='Ayoub', SAT=1000, ACT_composite=31)
        Student.objects.create(userid='Idrees', SAT_math=600, SAT_EBRW=500)
        Student.objects.create(userid='Eisa', SAT_math=600, SAT_EBRW=700,
                ACT_composite=31, GPA=3.0, high_school_name="Stuy")
        Student.objects.create(userid='Ryan', SAT_math=800, SAT_EBRW=800,
                ACT_composite=36, GPA=4.0, high_school_name="Stuy")
        Student.objects.create(userid='Andy', high_school_name="Stuy", SAT=1300)
        Student.objects.create(userid='Boodoo', num_AP_passed=10)
        Student.objects.create(userid='DooDoo', num_AP_passed=10)

    def test_one(self):
        r = similar_students('Ayoub')
        print(r)
        #  similar_students('Idrees')
        #  similar_students('Andy')
        #  similar_students('Ryan')
         

class RecommendationScoresTests(TestCase):
    # fixtures = ['test_data.json']
    def setUp(self):
        Student.objects.create(userid='Ayoub', SAT=1600, ACT_composite=36)
        # Student.objects.create(userid='Idrees', SAT_math=600, SAT_EBRW=500)
        #  Student.objects.create(userid='Eisa', SAT_math=600, SAT_EBRW=700,
                #  ACT_composite=31, GPA=3.0, high_school_name="Stuy")
        #  Student.objects.create(userid='Ryan', SAT_math=800, SAT_EBRW=800,
                #  ACT_composite=36, GPA=4.0, high_school_name="Stuy")
        #  Student.objects.create(userid='Andy', high_school_name="Stuy", SAT=1300)
        #  Student.objects.create(userid='Boodoo', num_AP_passed=10)
        #  Student.objects.create(userid='DooDoo', num_AP_passed=10)

    def test_one(self):
        r = recommend_colleges('Ayoub', 'Stony Brook University')
        asset 
        print(r)
        #  similar_students('Idrees')
        #  similar_students('Andy')
        #  similar_students('Ryan')
         


