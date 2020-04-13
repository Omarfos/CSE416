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

# Selenium Tests


class MySeleniumTests(LiveServerTestCase):
    # fixtures = ['user-data.json']
    port = 8000

    def setUp(self):
        self.selenium = WebDriver()
        self.selenium.implicitly_wait(1)

    def tearDown(self):
        self.selenium.quit()

    def test_register(self):
        self.selenium.get("localhost:3000/register/")
        first_name_input = self.selenium.find_element_by_name("firstName")
        first_name_input.send_keys("Bonya")
        last_name_input = self.selenium.find_element_by_name("lastName")
        last_name_input.send_keys("Fous")
        username_input = self.selenium.find_element_by_name("userid")
        username_input.send_keys("bonya")
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys("meowmeow")
        email_input = self.selenium.find_element_by_name("email")
        email_input.send_keys("bonya@gmail.com")
        self.selenium.find_element_by_xpath("//button").click()
        time.sleep(1)  # wait for database
        user = authenticate(username="bonya", password="meowmeow")
        self.assertIsNotNone(user)

    def test_login(self):
        self.user = User.objects.create_user(username="bonya", password="meowmeow")
        self.selenium.get("localhost:3000/login/")
        username_input = self.selenium.find_element_by_name("userid")
        username_input.send_keys("bonya")
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys("meowmeow")
        self.selenium.find_element_by_xpath("//button").click()
        home = self.selenium.find_element_by_name("searchQuery")
        self.assertIsNotNone(home)

    def test_search(self):
        College.objects.create(name="stony")
        self.selenium.get("localhost:3000/")
        search = self.selenium.find_element_by_name("searchQuery")
        search.send_keys("Stony")
        search.send_keys(Keys.RETURN)
        time.sleep(4)
        college = self.selenium.find_element_by_id("college_name")
        time.sleep(4)
        self.assertIsNotNone(college)

##############################################################################################################################################
    # selenium testing with respect to sorting
    def test_sorting(self):
        College.objects.create(name="stony", ranking=105)
        College.objects.create(name="xyz", ranking=10)
        # self.selenium.get("localhost:3000/search/college?sort=ranking")
        self.selenium.get("localhost:3000/search/college")
        time.sleep(1)  # wait for database
        self.selenium.find_element_by_id('dropMenu').click()
        self.selenium.find_element_by_id('rankOption').click() 
        time.sleep(1)  
        college = self.selenium.find_element_by_id("college_name")
        self.assertIsNotNone(college)

    #testing with respect to location
    def test_location(self):
        College.objects.create(name="stony", ranking=105)
        College.objects.create(name="xyz", ranking=10)
        self.selenium.get("localhost:3000/search/college")
        time.sleep(1)  # wait for database
        self.selenium.find_element_by_name('locationID').click()
        time.sleep(3)

    #testing clicking a college card
    def test_collegeCard(self):
        College.objects.create(name="stony", ranking=105)
        College.objects.create(name="xyz", ranking=10)
        self.selenium.get("localhost:3000/search/college")
        time.sleep(1)  # wait for database
        college = self.selenium.find_element_by_id("college_name")
        self.selenium.find_element_by_id('college_name').click()
        time.sleep(1)
        self.assertIsNotNone(college)


    #edit profile integration test 
    #problem rn is the handleEditProfile is not working when I try to 
    # def test_student_check(self):
    #     # self.user = User.objects.create_user(username="bonya", password="meowmeow")
    #     self.student = Student.objects.create(userid="Bonya", major_1="Felinology", GPA="3.0", residence_state="NY")
    #     self.selenium.get("localhost:3000/student/Bonya/")
    #     time.sleep(10)
    #     residence_input = self.selenium.find_element_by_id("residence_state")
    #     residence_input.send_keys(Keys.CONTROL, 'a')
    #     time.sleep(1)
    #     residence_input.send_keys(Keys.BACKSPACE)
    #     time.sleep(1)
    #     residence_input.send_keys("MA")
    #     time.sleep(2)  # wait for database
    #     self.selenium.find_element_by_name("updateButton").click()
    #     time.sleep(10)