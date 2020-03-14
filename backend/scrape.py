import requests
import re
import json
import os
from bs4 import BeautifulSoup
# from .models import HighSchool

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1",
    "Connection": "keep",
    "Upgrade-Insecure-Requests": "1"
}

college_scorecard_api_key = '9yXtfpTsEQjDu6zfPz6eWZqimWZe0hac1LcbXsAL'


def scrape_college_rankings(my_college):

    url = 'https://www.timeshighereducation.com/sites/default/files/the_data_rankings/united_states_rankings_2020_limit0_25839923f8b1714cf54659d4e4af6c3b.json'
    r = requests.get(url, headers=headers)
    rankings_list = r.json()['data']

    for college in rankings_list:
        if my_college == college['name']:
            print(f"{my_college.strip():50} ::: {college['rank']}")
            return college['rank']


def scrape_college_data():

    url = 'https://www.collegedata.com/college/Stony-Brook-University/'
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
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


def scrape_high_school(url=''):
    d = {}

    url = 'https://www.niche.com/k12/ward-melville-senior-high-school-east-setauket-ny/'
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        print("ERROR")
        return

    soup = BeautifulSoup(r.text, 'html.parser')
    name = soup.find('h1','postcard__title').text
    d['name'] = name

    extracted_json = re.search(
        '<script>window.App=(.*?);</script>', r.text).group(1)
    serialized_json = json.loads(extracted_json)
    data = serialized_json['context']['dispatcher']['stores']['ProfileStore']['content']['blocks']
    #s = HighSchool(name="Ward Melville Senior High School")
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
                
                    #print(f"{k['label']:50} ::: {k['value']}")
    # s.save()
    print(d)


scrape_high_school()
