import React, { useState, useEffect } from 'react';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home'
import Search from './components/search/Search'
import CollegeProfile from './components/college/CollegeProfile.js'
import Profile from './components/user/Profile.js'
import {Route,Switch, Redirect} from "react-router-dom";
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
            //PaymentResponse.ur
            //return <Redirect data={data}></Redirect>
        )
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (<Home/>)} />
        <Route exact path="/search/:q" render={() => (<Search/>)} />
        <Route exact path="/view_college/:id" render={() => (<CollegeProfile/>)} />
        <Route exact path="/profile/:id" render={()=>(<Profile user = {user}/>)} /> 
        <Route exact path="/login" render={() => (<Login/>)} />
        <Route exact path="/register" render={() => (<Register/>)} />

      </Switch>
    </div>
  );
}

export default App;
