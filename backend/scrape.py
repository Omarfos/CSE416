import requests
import re
import json
import os
from bs4 import BeautifulSoup
import time
import random
# from .models import HighSchool

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1", "Connection": "keep",
    "Upgrade-Insecure-Requests": "1",
}

user_agent_list = [
   #Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    #Firefox
    'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)'
]

college_scorecard_api_key = '9yXtfpTsEQjDu6zfPz6eWZqimWZe0hac1LcbXsAL'
college_data_url = 'https://www.timeshighereducation.com/sites/default/files/the_data_rankings/united_states_ranking \
s_2020_limit0_25839923f8b1714cf54659d4e4af6c3b.json'
college_scorecard = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?&api_key=9yXtfpTsEQjDu6zfPz6eWZqimWZe0hac1LcbXsAL'
 
def scrape_college_rankings(my_college):

    r = requests.get(url, headers=headers)
    rankings_list = r.json()['data']

    for college in rankings_list:
        if my_college == college['name']:
            print(f"{my_college.strip():50} ::: {college['rank']}")
            return college['rank']


def scrape_college_data(college):
    college = college.replace(',', '')
    college = college.replace('The ', '')
    college = college.replace('& ', '')
    college = college.replace('SUNY', 'State University of New York')

    url = f"https://www.collegedata.com/college/{college.replace(' ', '-')}"

    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        print(f"ERROR: unable to scrape {url}")
        return

    soup = BeautifulSoup(r.text, 'html.parser')
    majors = soup.find('ul', 'list--nice').contents
    majors = list(filter(lambda x : x != '\n', majors))
    for major in majors:
        print(major.text)
    return

    for description_list in soup.find_all('dl'):

        for k, v in zip(description_list.find_all('dt'), description_list.find_all('dd')):
            print(f'{k.text:50} ::: {v.text:20}')


def scrape_high_school_location():
    """
    Scrapes Niche.com for links to various high schools
    """

    results = []
    for i in range(1, 9):
        url = f'https://www.niche.com/k12/search/best-schools/?page={i}'
        print(url)
        r = requests.get(url, headers=headers)
        soup = BeautifulSoup(r.text, 'html.parser')
        for link in soup.find_all('a', 'search-result__link'):
            results.append(link['href'])

    return results


def scrape_high_school(url):

    headers["User-Agent"] = random.choice(user_agent_list)
    print(f"scraping {url}")
    
    time.sleep(random.randint(0,5))
    d = {}
    r = requests.get(url, headers=headers)

    if r.status_code != 200:
        print(f"ERROR: unable to scrape {url}")
        print("ERROR: Being blocked by niche.com")
        raise Warning

    soup = BeautifulSoup(r.text, 'html.parser')
    name = soup.find('h1','postcard__title').contents[0]
    d['name'] = name

    extracted_json = re.search(
        '<script>window.App=(.*?);</script>', r.text).group(1)
    serialized_json = json.loads(extracted_json)
    data = serialized_json['context']['dispatcher']['stores']['ProfileStore']['content']['blocks']

    for i in data:
        for j in i['buckets'].values():
            for k in j['contents']:
                if 'label' in k and 'value' in k:
                    label = k['label']
                    value = k['value']
                    if label == 'Address':
                        d['city'] = value['City']
                        d['state'] = value['State']

                    if label == 'Average Graduation Rate':
                        d['grad_rate'] = value

                    if label == 'Average SAT':
                        d['sat'] = value['average']

                    if label == 'Average ACT':
                        d['act'] = value['average']

                    if label == 'AP Enrollment':
                        d['ap_enroll'] = value
                
                    if label == 'Students':
                        d['num_students'] = value
    return(d)

