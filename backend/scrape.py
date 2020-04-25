import os
import time
import re
import json
import random
from typing import List

import requests
from bs4 import BeautifulSoup
from faker import Faker

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) Chrome/80.0.3987.132 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1",
    "Connection": "keep",
    "Upgrade-Insecure-Requests": "1",
}

college_scorecard_api_key = "9yXtfpTsEQjDu6zfPz6eWZqimWZe0hac1LcbXsAL"
college_scorecard_url = (
    "https://api.data.gov/ed/collegescorecard/v1/schools.json?&api_key="
    + college_scorecard_api_key
)
college_ranking_url = "http://allv22.all.cs.stonybrook.edu/~stoller/cse416/WSJ_THE/united_states_rankings_2020_limit0_25839923f8b1714cf54659d4e4af6c3b.json"
college_data_url = "http://allv22.all.cs.stonybrook.edu/~stoller/cse416/collegedata/"
niche_url = "http://allv22.all.cs.stonybrook.edu/~stoller/cse416/niche/"


def scrape_college_rankings(colleges: List[str]) -> List[dict]:
    """Return a mapping of each college to its ranking

    Parameters:
        colleges: ex, ['Stony Brook University', 'Cornell']

    Returns:
        ranking_dict: ex,{'Stony Brook University': 105, 'Cornell': 9}
    """
    r = requests.get(college_ranking_url, headers=headers)
    if r.status_code != 200:
        print(f"ERROR: unable to scrape {url}")
        return

    d = {}
    for college in r.json()["data"]:
        if college["name"] in colleges:
            r = college["rank"]
            r = r.strip("<=>").split("-")[0]
            d[college["name"]] = int(r)
    return d


def scrape_college_score_card(colleges: List[str]) -> List[dict]:
    """Return a mapping of each college to its college score card values

    Parameters:
        colleges: ex, ['Stony Brook University']

    Returns:
        college_dict: ex,{name: 'Stony Brook University', 'adm_rate': xx, ...}

    Currently supports size, adm_rate, institution_type, state, and grad debt
    Other fields will most likely be added in the future
    """
    # param map
    pm = {
        "size": "latest.student.size",
        "adm_rate": "latest.admissions.admission_rate.overall",
        "institution_type": "school.ownership",
        "grad_debt_median": "latest.aid.median_debt.completers.overall",
        "state": "school.state",
        "name": "school.name",
    }
    fields = ",".join(pm.values())
    control = ["", "Public", "Private nonprofit", "Private for-profit"]
    result = []

    for college in colleges:
        scraped = {"name": college}
        college = college.replace(", ", "-")

        if college == "Franklin & Marshall College":
            college = college.replace("&", "and")
        if college == "University of Alabama":
            college = "The University of Alabama"

        
        r = requests.get(
            college_scorecard_url, {"school.name": college, "fields": fields}
        ).json()["results"]

        print(r)

        d = list(filter(lambda x: x["school.name"] == college, r))
        d = d and d[0] or r[0]  # handle null case and choose first match
        scraped["size"] = d[pm["size"]]
        scraped["grad_debt_median"] = d[pm["grad_debt_median"]]
        scraped["adm_rate"] = d[pm["adm_rate"]]
        scraped["institution_type"] = control[d[pm["institution_type"]]]
        scraped["state"] = d[pm["state"]]
        result.append(scraped)

    return result


def parse_test_score(s):
    if s == "Not reported":
        return None
    if "average" in s:
        return int(re.match(r"(\d+)", s).group(1))
    else:
        low, high = re.match(r"(\d+)-(\d+)", s).group(1, 2)
        return (int(low) + int(high)) // 2


def scrape_college_data(colleges_list: List[str]) -> List[dict]:
    """Return a mapping of each college to its college data values

    Parameters:
        colleges: ex, ['Stony Brook University']

    Returns:
        college_dict: ex,{name: 'Stony Brook University', 'in_state_cost': xx, ...}

    Currently supports completion_rate, in_state_cost, SAT, ACT, and majors
    Other fields will most likely be added in the future
    """

    pm = {
        "completion_rate": "Students Graduating Within 4 Years",
        "in_state_cost": "Cost of Attendance",
        "SAT_math": "SAT Math",
        "SAT_EBRW": "SAT EBRW",
        "ACT_composite": "ACT Composite",
    }

    colleges = []
    for c in colleges_list:
        college = c.replace(",", "")
        college = college.replace("The ", "")
        college = college.replace("& ", "")
        college = college.replace("SUNY", "State University of New York")
        colleges.append(college)


    result = []
    for college, cleaned_college in zip(colleges_list, colleges):
        d = {"name": college, "majors": []}
        print(cleaned_college)
        url = college_data_url + cleaned_college.replace(" ", "-")
        print(url)

        r = requests.get(url, headers=headers)
        if r.status_code != 200:
            print(f"ERROR: unable to scrape {url}")
            return
        
        soup = BeautifulSoup(r.text, "html.parser")
        majors = soup.find("ul", "list--nice").contents
        majors = list(filter(lambda x: x != "\n", majors))
        for major in majors:
            d["majors"].append(major.text)

        d["majors"] = json.dumps(d["majors"])

        for description_list in soup.find_all("dl"):
            for k, v in zip(
                description_list.find_all("dt"), description_list.find_all("dd")
            ):
                if k.text == pm["in_state_cost"]:
                    if v.text == "Not available":
                        continue
                    if len(v.contents) == 1:
                        d["in_state_cost"] = int(
                            v.contents[0].strip("$").replace(",", "")
                        )
                        d["out_state_cost"] = d["in_state_cost"]
                    else:
                        in_state = re.match(
                            r"In-state: \$([\d]+,[\d]+)", v.contents[0]
                        ).group(1)
                        in_state = int(in_state.replace(",", ""))
                        out_state = re.match(
                            r"Out-of-state: \$([\d]+,[\d]+)", v.contents[2]
                        ).group(1)
                        out_state = int(out_state.replace(",", ""))
                        d["in_state_cost"] = in_state
                        d["out_state_cost"] = out_state

                elif k.text == pm["completion_rate"]:
                    if v.text.strip() != "Not reported":
                        d["completion_rate"] = float(v.text.strip("%"))

                elif k.text == pm["SAT_math"]:
                    d["SAT_math"] = parse_test_score(v.text.strip())

                elif k.text == pm["SAT_EBRW"]:
                    d["SAT_EBRW"] = parse_test_score(v.text.strip())

                elif k.text == pm["ACT_composite"]:
                    d["ACT_composite"] = parse_test_score(v.text.strip())

        result.append(d)

    return result

def scrape_high_school_location():
    """
    Scrapes Niche.com for links to various high schools
    """

    results = []
    for i in range(1, 9):
        url = f"https://www.niche.com/k12/search/best-schools/?page={i}"
        print(url)
        r = requests.get(url, headers=headers)
        soup = BeautifulSoup(r.text, "html.parser")
        for link in soup.find_all("a", "search-result__link"):
            results.append(link["href"])

    return results


def scrape_high_school(hs_list, url=False):
    result = []
    for hs in hs_list:
        if not url:
            end_point = f'{hs["name"]} {hs["city"]} {hs["state"]}'
            end_point = end_point.lower()
            end_point = end_point.replace(" ", "-")
            url = niche_url + end_point
        else:
            url = niche_url + hs

        faker = Faker()
        headers["User-Agent"] = faker.user_agent()
        print(f"scraping {url}")
        d = {}
        r = requests.get(url, headers=headers)

        if r.status_code != 200:
            print(f"ERROR: unable to scrape {url}")
            print("ERROR: Being blocked by niche.com")
            return result

        soup = BeautifulSoup(r.text, "html.parser")
        name = soup.find("h1", "postcard__title").contents[0]
        d["name"] = name

        extracted_json = re.search("<script>window.App=(.*?);</script>", r.text).group(
            1
        )
        serialized_json = json.loads(extracted_json)
        data = serialized_json["context"]["dispatcher"]["stores"]["ProfileStore"][
            "content"
        ]["blocks"]

        for i in data:
            for j in i["buckets"].values():
                for k in j["contents"]:
                    if "label" in k and "value" in k:
                        label = k["label"]
                        value = k["value"]
                        if label == "Address":
                            d["city"] = value["City"]
                            d["state"] = value["State"]

                        if label == "Average Graduation Rate":
                            d["grad_rate"] = value

                        if label == "Average SAT":
                            d["sat"] = value["average"]

                        if label == "Average ACT":
                            d["act"] = value["average"]

                        if label == "AP Enrollment":
                            d["ap_enroll"] = value

                        if label == "Students":
                            d["num_students"] = value
        result.append(d)

    return result
