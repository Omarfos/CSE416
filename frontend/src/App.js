import React, { useState, useEffect } from 'react';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home'
import Search from './components/search/Search'
import CollegeProfile from './components/college/CollegeProfile'
import Profile from './components/user/Profile'
import Navbar from './components/Navbar.js';
import {Route,Switch, Redirect, useHistory} from "react-router-dom";
import { Container } from '@material-ui/core';
import axios from 'axios';
import './App.css';


function App() {
  //Set it to this right now. 
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  let history = useHistory();

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   fetch('http://localhost:8000/student/omar')
  //       .then(response => response.json())
  //       .then(
  //           data => {
  //               // console.log('data', data);
  //               // setUser(data[0]);
  //           }
  //           //PaymentResponse.ur
  //           //return <Redirect data={data}></Redirect>
  //       )
  // }, []);

  async function handleLogin(e) {
    e.preventDefault();
    let userid = e.target.userid.value;
    let password = e.target.password.value;
    fetch('http://localhost:8000/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, password}),
    }).then((data) => {
      if (data.status === 200)
        setUser(userid);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  async function handleLogout(event){
    console.log("Logging out");
    //call backend post /logout
    setUser(null);
    history.push('/');
  }

  async function handleRegister(event){
    //call backend post /register to register for user
    //change logged in user state.  
    //After registered, redirect to profile page.
    //history.push('/profile/');
  }

  return (
    <div className="App">
      <Navbar user = {user} handleLogout = {handleLogout}/>
      <Switch>
        <Route exact path="/" render={() => (<Home/>)} />
        <Route exact path="/search/:q" render={() => (<Search/>)} />
        <Route exact path="/view_college/:id" render={() => (<CollegeProfile/>)} />
        <Route exact path="/profile/:id" render={()=>(<Profile user = {user}/>)} />    
        <Route exact path="/login" render={() => (<Login errorMessage={errorMessage} handleLogin = {handleLogin} user = {user}/>)} />
        {!user && 
          <React.Fragment>
            <Route exact path="/register" render={() => (<Register handleRegister = {handleRegister}/>)} />
          </React.Fragment>
        }   

        <Route render={() => <NotFound/>}/>
      </Switch>
    </div>
  );
}


//DESIGN
function NotFound(props) {
  return (
      <h1>Not found or please log out first</h1>
  )
}
export default App;
