import requests
import re
import json
import os
from bs4 import BeautifulSoup
import time
import random
from faker import Faker

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1", "Connection": "keep",
    "Upgrade-Insecure-Requests": "1",
}

college_scorecard_api_key = '9yXtfpTsEQjDu6zfPz6eWZqimWZe0hac1LcbXsAL'
college_scorecard_url = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?&api_key=' + college_scorecard_api_key
college_ranking_url = 'http://allv22.all.cs.stonybrook.edu/~stoller/cse416/WSJ_THE/united_states_rankings_2020_limit0_25839923f8b1714cf54659d4e4af6c3b.json' 
#college_data_url = 'http://allv22.all.cs.stonybrook.edu/~stoller/cse416/collegedata/'
college_data_url = 'https://www.collegedata.com/college/'
niche_url = 'https://www.niche.com/k12/'

def scrape_college_rankings(colleges):
    r = requests.get(college_ranking_url, headers=headers)
    rankings_list = r.json()['data']
    d = {}

    for college in rankings_list:
        if college['name'] in colleges:
            r = college['rank']
            r = r.strip('<=>').split('-')[0]
            d[college['name']] = int(r)

    return d


def scrape_college_score_card(colleges):

    f = {   
            'size':             'latest.student.size', 
            'adm_rate':         'latest.admissions.admission_rate.overall', 
            'institution_type': 'school.ownership', 
            'grad_debt_median': 'latest.aid.median_debt.completers.overall',
            'state':            'school.state',
            'name':             'school.name'
    }

    control = ['','Public', 'Private nonprofit', 'Private for-profit']
    fields = ",".join(f.values())
    result = []

    for college in colleges:
        scraped = {'name': college}
        college = college.replace(', ', '-')

        if  'Franklin &' in college:
            college = college.replace('&', 'and')
        if 'Alabama' in college:
            college = 'The University of Alabama'

        r = requests.get(college_scorecard_url, {'school.name': college,
            'fields': fields}).json()['results']

        d = list(filter(lambda x : x['school.name'] == college, r))
        d = d and d[0] or r[0]
        scraped['size'] = d[f['size']]
        scraped['grad_debt_median'] = d[f['grad_debt_median']]
        scraped['adm_rate'] = d[f['adm_rate']]
        scraped['institution_type'] = control[d[f['institution_type']]]
        scraped['state'] = d[f['state']]
        result.append(scraped)
    
    return result

def parse_test_score(s):
    if 'average' in s:
        return int(re.match(r'(\d+)', s).group(1))
    else:
        if s == 'Not reported':
            return -1
        low, high = re.match(r'(\d+)-(\d+)', s).group(1,2)
        return (int(low) + int(high)) // 2

   

def scrape_college_data(colleges_list):
    f = {
            'completion_rate' : 'Students Graduating Within 4 Years',
            'in_state_cost'   : 'Cost of Attendance',
            'SAT_math'   : 'SAT Math',
            'SAT_EBRW'   : 'SAT EBRW',
            'ACT_composite'   : 'ACT Composite',
        }
    
    colleges = {}
    for c in colleges_list:
        college = c.replace(',', '')
        college = college.replace('The ', '')
        college = college.replace('& ', '')
        college = college.replace('SUNY', 'State University of New York')
        colleges[c] = college 
    


    result = []
    for college, cleaned_college in colleges.items():

        url = college_data_url + cleaned_college.replace(' ', '-')

        r = requests.get(url, headers=headers)
        if r.status_code != 200:
            print(f"ERROR: unable to scrape {url}")
            return

        soup = BeautifulSoup(r.text, 'html.parser')

        d = {'name': college, 'majors': [] }

        majors = soup.find('ul', 'list--nice').contents
        majors = list(filter(lambda x : x != '\n', majors))
        for major in majors:
            d['majors'].append(major.text)

        d['majors'] = json.dumps(d['majors'])

        for description_list in soup.find_all('dl'):
            for k, v in zip(description_list.find_all('dt'), description_list.find_all('dd')):
                #print(f'{k.text:40}::{v.text:40}')

                if k.text == f['in_state_cost']:
                    if v.text == 'Not available':
                        continue

                    if len(v.contents) == 1:
                        d['in_state_cost'] =  int(v.contents[0].strip('$').replace(',',''))
                        d['out_state_cost'] =   d['in_state_cost'] 
                    else:
                        in_state = re.match(r'In-state: \$([\d]+,[\d]+)',v.contents[0]).group(1)
                        in_state = int(in_state.replace(',',''))
                        out_state = re.match(r'Out-of-state: \$([\d]+,[\d]+)', v.contents[2]).group(1)
                        out_state = int(out_state.replace(',',''))
                        d['in_state_cost'] = in_state
                        d['out_state_cost'] = out_state

                elif k.text == f['completion_rate']:
                    if v.text.strip() != 'Not reported':
                        d['completion_rate'] = float(v.text.strip('%'))

                elif k.text == f['SAT_math']: 
                    d['SAT_math'] = parse_test_score(v.text.strip())
                       
                elif k.text == f['SAT_EBRW']: 
                    d['SAT_EBRW'] = parse_test_score(v.text.strip())

                elif k.text == f['ACT_composite']: 
                    d['ACT_composite'] = parse_test_score(v.text.strip())

        result.append(d)

    return result


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


def scrape_high_school(hs_list):
    result = []
    for hs in hs_list:
        end_point = f'{hs["name"]} {hs["city"]} {hs["state"]}'
        end_point = end_point.replace(' ', '-')
        url = niche_url + end_point

        faker = Faker()
        headers["User-Agent"] = faker.user_agent() 
        print(f"scraping {url}")
        
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
        result.append(d)

    return(result)

#if __name__ == '__main__':
#    scrape_high_school('http://allv22.all.cs.stonybrook.edu/~stoller/cse416/niche/academic-magnet-high-school-north-charleston-sc/') 


