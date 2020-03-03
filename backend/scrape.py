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
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "DNT": "1", "Connection": "close", "Upgrade-Insecure-Requests": "1"}

r = requests.get('https://www.niche.com/k12/ward-melville-senior-high-school-east-setauket-ny/academics', headers=headers)
print(r)
s = re.search('<script>window.App=(.*?);<', r.text).group(1)
d = json.loads(s)
print(d['context']['dispatcher']['stores']['ProfileStore']['content']['blocks'])

