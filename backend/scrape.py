import requests
import re
import json
import os

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1",
    "Connection": "keep",
    "Upgrade-Insecure-Requests": "1"
}


def scrape_high_school():

    url = 'https://www.niche.com/k12/florida-virtual-school-riviera-beach-fl/academics/'
    r = requests.get(url, headers=headers)
    extracted_json = re.search(
        '<script>window.App=(.*?);</script>', r.text).group(1)
    serialized_json = json.loads(extracted_json)
    data = serialized_json['context']['dispatcher']['stores']['ProfileStore']['content']['blocks']

    for i in data:
        for j in i['buckets'].values():
            for k in j['contents']:
                if 'label' in k and 'value' in k:
                    print(f"{k['label']:50} ::: {k['value']}")


def scrape_college_rankings():

    url = 'https://www.timeshighereducation.com/sites/default/files/the_data_rankings/united_states_rankings_2020_limit0_25839923f8b1714cf54659d4e4af6c3b.json'
    r = requests.get(url, headers=headers)
    colleges_list = r.json()['data']

    with open('colleges.txt', 'r') as f:
        for my_college in f.readlines():
            for college in colleges_list:
                if my_college.strip() == college['name']:
                    print(f"{my_college.strip():50} ::: {college['rank']}")
                    break


scrape_high_school()
scrape_college_rankings()
