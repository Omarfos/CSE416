import React, { useState, useEffect } from 'react';
import Login from './components/user/login.js'
import Register from './components/user/register.js'
import Home from './components/home.js'
import Search from './components/search/search.js'
import CollegeProfile from './components/college/college-profile.js'
import Profile from './components/user/profile.js'
import Navbar from './components/nav-bar.js';
import { Route, Switch, Redirect } from "react-router-dom";
import './app.css';
import NotFound from './components/not-found';


function App() {
  //Set it to this right now. 
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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



  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/" render={() => (<Home />)} />
        <Route exact path="/search/:q" render={() => (<Search />)} />
        <Route exact path="/college/:id" render={() => (<CollegeProfile errorMessage={errorMessage} setError={setErrorMessage} />)} />
        <Route exact path="/profile/:id" render={() => (<Profile user={user} />)} />
        <Route exact path="/login" render={() => (<Login errorMessage={errorMessage} setError={setErrorMessage} setUser={setUser} user={user} />)} />
        <Route exact path="/register" render={() => (<Register user={user} setUser={setUser} errorMessage={errorMessage} setError={setErrorMessage} />)} />

        <Route render={() => <NotFound />} />
      </Switch>
    </div>
  );
}


export default App;
