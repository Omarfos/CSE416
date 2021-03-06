import React, { useState, useEffect } from "react";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/Home";
import Search from "./components/search/Search";
import CollegeProfile from "./components/college/CollegeProfile";
import Profile from "./components/user/Profile";
import Navbar from "./components/Navbar.js";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import axios from 'axios';
import { loginCheckUrl } from "./components/Url";



function App() {
  //Set it to this right now.
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(loginCheckUrl)
      .then((data) => {
        setUser(data.data.user);
      })
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Switch>
        {user &&
          <React.Fragment>
            {loading ? <Route render={() => <div>LOADING</div>} /> :
              <>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/search/:q" render={() => <Search user={user} />} />
                <Route exact path="/college/:id" render={() => (<CollegeProfile />)} />
                <Route exact path="/student/:id" render={() => <Profile user={user} />} />
              </>
            }
          </React.Fragment>
        }
        {!user &&
          <>
            {loading ? <Route render={() => <div>LOADING</div>} /> :
              <React.Fragment>
                <Route exact path={["/login", "/search/:q", "/college/:id", "/student/:id", "/"]} render={() => (<Login errorMessage={errorMessage} setError={setErrorMessage} setUser={setUser} user={user} />)} />
                <Route exact path="/register" render={() => (<Register user={user} setUser={setUser} errorMessage={errorMessage} setError={setErrorMessage} />)} />
              </React.Fragment>
            }
          </>
        }
        <Route render={() => <NotFound />} />

      </Switch>
    </div>
  );
}

export default App;
