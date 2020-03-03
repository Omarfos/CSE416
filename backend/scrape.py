import requests
import re
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1",
    "Connection": "close",
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
                    print(f"{k['label']}: {k['value']}")


scrape_high_school()
