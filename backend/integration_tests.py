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
from selenium.webdriver.support.ui import Select

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

    # def tearDown(self):
    #     self.selenium.quit()

        # def test_register(self):
        #     self.selenium.get("localhost:3000/register/")
        #     first_name_input = self.selenium.find_element_by_name("firstName")
        #     first_name_input.send_keys("Bonya")
        #     last_name_input = self.selenium.find_element_by_name("lastName")
        #     last_name_input.send_keys("Fous")
        #     username_input = self.selenium.find_element_by_name("userid")
        #     username_input.send_keys("bonya")
        #     password_input = self.selenium.find_element_by_name("password")
        #     password_input.send_keys("meowmeow")
        #     # time.sleep(6)
        #     email_input = self.selenium.find_element_by_name("email")
        #     email_input.send_keys("bonya@gmail.com")
        #     self.selenium.find_element_by_xpath("//button").click()
        #     time.sleep(4)  # wait for database
        #     user = authenticate(username="bonya", password="meowmeow")
        #     self.assertIsNotNone(user)

        # def test_login(self):
        #     self.user = User.objects.create_user(username="bonya", password="meowmeow")
        #     self.selenium.get("localhost:3000/login/")
        #     username_input = self.selenium.find_element_by_name("userid")
        #     username_input.send_keys("bonya")
        #     password_input = self.selenium.find_element_by_name("password")
        #     password_input.send_keys("meowmeow")
        #     time.sleep(4)  # wait for database
        #     self.selenium.find_element_by_xpath("//button").click()
        #     home = self.selenium.find_element_by_name("searchQuery")
        #     self.assertIsNotNone(home)

        # def test_search(self):
        #     College.objects.create(name="stony")
        #     self.selenium.get("localhost:3000/")
        #     search = self.selenium.find_element_by_name("searchQuery")
        #     search.send_keys("Stony")
        #     search.send_keys(Keys.RETURN)
        #     college = self.selenium.find_element_by_id("college_name")
        #     self.assertIsNotNone(college)

    # selenium testing with respect to sorting
    # def test_sorting(self):
    #     College.objects.create(name="stony", ranking=105)
    #     College.objects.create(name="xyz", ranking=10)
    #     self.selenium.get("localhost:3000/search/1")
    #     time.sleep(4)  # wait for database
    #     select = self.selenium.find_element_by_name('sortingMenu')
    #     select.select_by_index(0)
    #     time.sleep(2)  # wait for database

    #edit profile integration test
    def test_student_check(self):
        # self.user = User.objects.create_user(username="bonya", password="meowmeow")
        self.student = Student.objects.create(userid="Bonya", major_1="Felinology", GPA="3.0", residence_state="NY")
        # self.selenium.get("localhost:3000/login/")
        # username_input = self.selenium.find_element_by_name("userid")
        # username_input.send_keys("bonya")
        # password_input = self.selenium.find_element_by_name("password")
        # password_input.send_keys("meowmeow")
        self.selenium.get("localhost:3000/student/Bonya/")
        time.sleep(10)  # wait for database

        # sorting = self.selenium.find_element_by_name("searchQuery")


