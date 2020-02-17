import React, { useState, useEffect } from 'react';
import Student from './components/Student'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home'
import FindCollege from './components/search/FindCollege'
import SimilarHighSchool from './components/search/SimilarHighSchool.js'
import CollegeProfile from './components/college/CollegeProfile.js'
import MyProfile from './components/user/MyProfile.js'
import {Route,Switch} from "react-router-dom";
import axios from 'axios';
import './App.css';


function App() {
  //Set it to this right now. 
  const [user, setUser] = useState({
    userid: 'omar',
    password: 'hello',
    residence_state: 'NY',
    high_school_name: 'Stuy',
    high_school_city: 'NYC',
    college_class: 'Senior'
  });
  useEffect(() => {
    // Update the document title using the browser API
    fetch('http://localhost:8000/students')
        .then(response => response.json())
        .then(
            data => {
                console.log('data', data);
                setUser(data[0]);
            }
        )
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (<Home/>)} />
        <Route exact path="/student" render={() => (<Student/>)} /> 
        <Route exact path="/find_college" render={() => (<FindCollege/>)} />
        <Route exact path="/find_similar_high_school" render={() => (<SimilarHighSchool/>)} />
        <Route exact path="/view_college" render={() => (<CollegeProfile/>)} />


        <Route exact path="/my_profile" render={()=>(<MyProfile user = {user}/>)} /> 
        <Route exact path="/login" render={() => (<Login/>)} />
        <Route exact path="/register" render={() => (<Register/>)} />

      </Switch>
    </div>
  );
}

export default App;
