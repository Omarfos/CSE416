import json
import os
import time

from django.test import TestCase, LiveServerTestCase
from django.test import Client
from django.test import RequestFactory
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys

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
            {"info":"{\"userid\": \"john\", \"password\": \"smith\"}"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertTrue("SUCCESS" in r.json())

    def test_register_invalid_input(self):
        r = self.client.post(
            "/register/",
            {"info":"{\"usri\": \"john\", \"pass\": \"smith\"}"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 400)

    def test_register_user_already_exists(self):
        Student.objects.create(userid="john")
        r = self.client.post(
            "/register/",
            {"info":"{\"userid\": \"john\", \"password\": \"smith\"}"},
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
            {"loginInfo":"{\"userid\": \"bonya\", \"password\": \"meow\"}"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("SUCCESS", ""), "User logged in")

    def test_login_invalid_creds(self):
        r = self.client.post(
            "/login/",
            {"loginInfo":"{\"userid\": \"bonya\", \"password\": \"soRussian\"}"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("ERROR", ""), "Invalid User Name or Password")

class LogoutTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="bonya", password="meow")

    def test_logout_valid_creds(self):
        r = self.client.post(
            "/login/",
            {"loginInfo":"{\"userid\": \"bonya\", \"password\": \"meow\"}"},
            content_type="application/json",
        )
        r1 = self.client.post(
            "/logout/",
            {"userid":"bonya"},
        )
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json().get("SUCCESS", ""),"User logged out")


class CheckIfLoginTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="bonya", password="meow")

    def test_if_login_valid(self):
        r = self.client.post(
            "/login/",
            {"loginInfo":"{\"userid\": \"bonya\", \"password\": \"meow\"}"},
            content_type="application/json",
        )
        r1 = self.client.post(
            "/loginCheck/",
        )
        self.assertEqual(r1.json().get("user", ""),"bonya")

    def test_if_login_Invalid(self):
        r1 = self.client.post(
            "/loginCheck/",
        )
        self.assertEqual(r1.json().get("user", ""),"")


class StudentProfileTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.student = Student.objects.create(userid="Bonya", major_1="Felinology")

    def test_view_profile(self):
        r = self.client.get("/student/Bonya/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()["student"]["major_1"], "Felinology")

    def test_invalid_view_profile(self):
        r = self.client.get("/student/Olesia/")
        self.assertEqual(r.status_code, 404)

class StudentProfilePostTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.student = Student.objects.create(userid="Bonya",  password="meow")

    def test_change_profile(self):
        r1 = self.client.post(
            "/login/",
            {"loginInfo":"{\"userid\": \"Bonya\", \"password\": \"meow\"}"},
            content_type="application/json",
        )
        #\"high_school_name\":Rye Country Day School,\"high_school_city\":dye,\"high_school_state\":ny,
        r = self.client.post(
            "/student/Bonya/edit/",
            {"student":"{\"high_school_name\":\"Rye Country Day School\",\"high_school_city\":\"dye\",\"high_school_state\":\"ny\",\"residence_state\":\"ny\",\"major_1\":\"Felinology\",\"GPA\":2.2,\"college_class\":2020,\"ACT_English\":20}"},
            content_type="application/json",
        )
        self.assertEqual(r.status_code, 200)


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

#  
#  class ScrapeCollegeDataTests(TestCase):
    #  def test_scrape_colleges(self):
        #  colleges = ["Stony Brook University"]
        #  expected = [
            #  {
                #  "name": "Stony Brook University",
                #  "majors": [
                    #  "African-American/Black Studies",
                    #  "American/United States Studies/Civilization",
                    #  "Anthropology",
                    #  "Applied Mathematics, General",
                    #  "Art History, Criticism and Conservation",
                    #  "Art/Art Studies, General",
                    #  "Asian Studies/Civilization",
                    #  "Astronomy",
                    #  "Athletic Training/Trainer",
                    #  "Atmospheric Sciences and Meteorology, General",
                    #  "Biochemistry",
                    #  "Bioengineering and Biomedical Engineering",
                    #  "Biological and Physical Sciences",
                    #  "Biology/Biological Sciences, General",
                    #  "Business Administration and Management, General",
                    #  "Chemical and Biomolecular Engineering",
                    #  "Chemistry, General",
                    #  "Chemistry, Other",
                    #  "Civil Engineering, General",
                    #  "Clinical Laboratory Science/Medical Technology/Technologist",
                    #  "Comparative Literature",
                    #  "Computer and Information Sciences, General",
                    #  "Drama and Dramatics/Theatre Arts, General",
                    #  "Ecology",
                    #  "Economics, General",
                    #  "Electrical and Electronics Engineering",
                    #  "Engineering, General",
                    #  "English Language and Literature, General",
                    #  "Environmental Design/Architecture",
                    #  "Environmental Studies",
                    #  "European Studies/Civilization",
                #  ],
                #  "SAT_math": 675,
                #  "SAT_EBRW": 671,
                #  "ACT_composite": 28,
                #  "in_state_cost": 26091,
                #  "out_state_cost": 43761,
                #  "completion_rate": 52.8,
            #  }
        #  ]
        #  r = scrape_college_data(colleges)
        #  test_r = []
        #  for entry in r:
            #  entry["majors"] = json.loads(entry["majors"])
            #  test_r.append(entry)
        #  self.assertListEqual(test_r, expected)

#  
#  class ScrapeNicheTests(TestCase):
    #  def test_one(self):
        #  hs = [{"name": "Whitney High School", "city": "cerritos", "state": "CA"}]
        #  expected = [
            #  {
                #  "name": "Whitney High School",
                #  "city": "Cerritos",
                #  "state": "CA",
                #  "grad_rate": 0.95,
                #  "sat": 1400,
                #  "act": 32,
                #  "ap_enroll": 0.600883,
                #  "num_students": 1008,
            #  }
#  
        #  ]
        #  r = scrape_high_school(hs)
        #  self.assertListEqual(r, expected)

#######################################################################################
# Algorithms Test
# class SimilarStudentsTests(TestCase):
#     #fixtures = ['test_data.json']
#     def setUp(self):
#         Student.objects.create(userid='Ayoub', SAT=1000, ACT_composite=31)
#         Student.objects.create(userid='Idrees', SAT_math=600, SAT_EBRW=500)
#         Student.objects.create(userid='Eisa', SAT_math=600, SAT_EBRW=700,
#                 ACT_composite=31, GPA=3.0, high_school_name="Stuy")
#         Student.objects.create(userid='Ryan', SAT_math=800, SAT_EBRW=800,
#                 ACT_composite=36, GPA=4.0, high_school_name="Stuy")
#         Student.objects.create(userid='Andy', high_school_name="Stuy", SAT=1300)
#         Student.objects.create(userid='Boodoo', num_AP_passed=10)
#         Student.objects.create(userid='DooDoo', num_AP_passed=10)

#     def test_one(self):
#         # expected = [<Student: Ayoub>, <Student: Idrees>, <Student: Eisa>, <Student: Ryan>, <Student: Andy>, <Student: Boodoo>, <Student: DooDoo>]
#         r = similar_students('Eisa')
#         # self.assertListEqual(r, expected)
#         #we need a asert but the expected variable, if I comment it out it shows eros.
#         print(r)
        
class RecommendationScoresTests(TestCase):
    # fixtures = ['test_data.json']
    def setUp(self):
        higherRanking = random.randint(1, 599)
        lowerRanking = random.randint(higherRanking+1, 600)
        college1 = College.objects.create(name="College1", ranking=higherRanking)
        college2 = College.objects.create(name="College2", ranking=higherRanking)
        college3 = College.objects.create(name="College3", ranking=higherRanking)
        college4 = College.objects.create(name="College4", ranking=lowerRanking)
        
        statuses = ["pending", "accepted", "deferred", "waitlisted", "withdrawn"]
        status = statuses[random.randint(0,5)]
        for i in range(100):
            student = None
            if random.randint(0,1) == 0:
                # student with higher values
                student = Student.objects.create(userid='Student'+str(i), SAT=random.randint(1000, 1600), ACT_composite=random.randint(19, 36), GPA=random.randint(200, 400)/100)
                Application.objects.create(student=student, college=college1, status=status)
            else:
                # student with lower values
                student = Student.objects.create(userid='Student'+str(i), SAT=random.randint(400, 999), ACT_composite=random.randint(1, 18), GPA=random.randint(1, 199)/100)
                Application.objects.create(student=student, college=college2, status=status)
            Application.objects.create(student=student, college=college3, status=status)
            Application.objects.create(student=student, college=college4, status=status)
            
        Student.objects.create(userid='Ayoub', SAT=random.randint(1000, 1600), ACT_composite=random.randint(19, 36), GPA=random.randint(200, 400)/100)
                  
    """
    test that for college, where user is average, recommendation score is not less than 
    for college where user is above average; ranking of colleges is the same
    """
    def test_similarity(self):
        colleges = ["College1", "College2"]
        r = recommend_colleges('Ayoub', colleges)
        self.assertGreaterEqual(r[0], r[1])
    
    """
    test that for two colleges with same students, recommendation score for college 
    with higher ranking is not less than for college with lower ranking
    """
    def test_ranking(self):
        colleges = ["College3", "College4"]
        r = recommend_colleges('Ayoub', colleges)
        self.assertGreaterEqual(r[0], r[1])
        

class similarHighSchool(TestCase):
    def setUp(self):
        HighSchool.objects.create(name='VS Central', city='Valley Stream', state='NY', 
            sat=1400, act=28, num_students=300, grad_rate=80.0, ap_enroll=5)
        HighSchool.objects.create(name='VS North', city='Valley Stream', state='NY', 
            sat=1400, act=28, num_students=300, grad_rate=80.0, ap_enroll=5)
        
    def test_one(self):
        expected = [
            {'id': 1, 'name': 'VS Central', 'city': 'Valley Stream', 'state': 'NY', 'sat': 1400, 'act': 28, 
                'num_students': 300, 'grad_rate': 80.0, 'ap_enroll': 5.0, 'score': 6.5}, 
                    
            {'id': 2, 'name': 'VS North', 'city': 'Valley Stream', 'state': 'NY', 'sat': 1400, 'act': 28, 
                'num_students': 300, 'grad_rate': 80.0, 'ap_enroll': 5.0, 'score': 6.5}
            ]
        r = similar_hs('VS Central')
        self.assertListEqual(r, expected)

# class verifyAcceptanceDecision(TestCase):
#     # def setUp(self):
#         # x = Student.objects.create(userid='Ayoub', SAT=1600, ACT_composite=36)
#         # y = College.objects.create(
#         #     name="Columbia", out_state_cost=70000, ranking=10, state="NY"
#         # )
#         # App = Application.objects.create(x, y, status="denied")    

#     def test_one(self):   
#         x = Student.objects.create(userid='Ayoub', SAT=1600, ACT_composite=36)
#         y = College.objects.create(
#             name="Columbia", out_state_cost=70000, ranking=10, state="NY"
#         )
#         App = Application.objects.create({"fields": {"student": x, "college": y, "status": "withdrawn"}})
#         r = verify_acceptance_decision('Ayoub', App)
        # broken, not working


#####################################################################################################

# class similarProfiles(TestCase):
#     def setUp(self):
#         Student.objects.create(userid='Ayoub', SAT=1000, ACT_composite=31)
#         Student.objects.create(userid='Idrees', SAT_math=600, SAT_EBRW=500)
#         Student.objects.create(userid='Eisa', SAT_math=600, SAT_EBRW=700,
#                 ACT_composite=31, GPA=3.0, high_school_name="Stuy")
#         Student.objects.create(userid='Ryan', SAT_math=800, SAT_EBRW=800,
#                 ACT_composite=36, GPA=4.0, high_school_name="Stuy")
#         Student.objects.create(userid='Andy', high_school_name="Stuy", SAT=1300)
#         Student.objects.create(userid='Boodoo', num_AP_passed=10)
#         Student.objects.create(userid='DooDoo', num_AP_passed=10)

#     def test_one(self):   
#         r = self.client.post(
#             "/login/",
#             {"userid": "bonya", "password": "meow"},
#             content_type="application/json",
#         )
#         z = get_similar_profiles(r)
#         print(z)
