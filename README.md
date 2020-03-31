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


## PlantUml Diagram

### Setup
- Install PlantUml Extension
1. Open VSCode Settings
2. Search PlantUML
3. Set export directory .
4. Set render server
5. Set server https://www.plantuml.com/plantuml

### Exporting Diagrams
1. Press CMD or CTRL + SHIFT + P
2. Type plantUml
3. Preview diagram first to see your changes
4. When satisfied, press export diagram, choose PNG

[Link to SRS](https://docs.google.com/document/d/1zBmLondr7yHdbPGrkzg776qxLEJqCqIKL3l4ssYfD_s/edit#)

[Plant UML docs](https://plantuml-documentation.readthedocs.io/en/latest/diagrams/usecase.html)

