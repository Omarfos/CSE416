import React from 'react';
import Student from './components/user/Student'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home'
import FindCollege from './components/search/FindCollege'
import SimilarHighSchool from './components/search/SimilarHighSchool.js'
import ViewCollege from './components/college/ViewCollege.js'
import './App.css';
import {Route,Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (<Home/>)} />
        <Route exact path="/student" render={() => (<Student/>)} />
        <Route exact path="/find_college" render={() => (<FindCollege/>)} />
        <Route exact path="/find_similar_high_school" render={() => (<SimilarHighSchool/>)} />
        <Route exact path="/view_college" render={() => (<ViewCollege/>)} />


        <Route exact path="/login" render={() => (<Login/>)} />
        <Route exact path="/register" render={() => (<Register/>)} />

      </Switch>
    </div>
  );
}

export default App;
