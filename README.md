# Bingo

## Prerequisites

- git: https://git-scm.com/downloads
- node.js: https://nodejs.org/en/
- pip: https://pip.pypa.io/en/stable/installing/
- Python 3.8: https://www.python.org/downloads/

## Installation

- git clone https://github.com/binglingdong/CSE416
- cd CSE416
- python3 -m pip install --upgrade pip
- python3 -m pip install pipenv
- python3 -m pipenv install --dev
- cd frontend 
- npm install

## Starting the servers from root directory

- python3 -m pipenv shell
- python3 -m manage runserver
- cd frontend 
- npm start

## Testing

### Unit Tests
- python -m manage test 
### Integration Tests
- google chrome driver: https://chromedriver.chromium.org/
- close the django server, if it's running
- make sure react server is running
- python -m manage test backend.integration_tests 

## Admin

- http://127.0.0.1:8000/admin/
- user: admin
- pass: bingo



## Importing data

- pipenv shell
- python -m manage import {hs,college}



