import React, { useState, useEffect } from 'react';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home'
import Search from './components/search/Search'
import CollegeProfile from './components/college/CollegeProfile'
import Profile from './components/user/Profile'
import Navbar from './components/Navbar.js';
import {Route,Switch, Redirect} from "react-router-dom";
import './App.css';


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
      <Navbar user = {user} setUser = {setUser}/>
      <Switch>
        <Route exact path="/" render={() => (<Home/>)} />
        <Route exact path="/search/:q" render={() => (<Search/>)} />
        <Route exact path="/college/:id" render={() => (<CollegeProfile errorMessage={errorMessage} setError = {setErrorMessage}/>)} />
        <Route exact path="/profile/:id" render={()=>(<Profile user = {user}/>)} />    
        <Route exact path="/login" render={() => (<Login errorMessage={errorMessage} setError = {setErrorMessage} setUser = {setUser} user = {user}/>)} />
        <Route exact path="/register" render={() => (<Register user = {user} setUser = {setUser} errorMessage={errorMessage} setError = {setErrorMessage}/>)} />
          

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
