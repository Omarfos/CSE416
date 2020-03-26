import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory}  from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {Route,Switch, Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }, 
  navBar: {
    backgroundColor: "#eef5ff"
  },
  title: {
    flexGrow: 1
  },
  button:{
    textDecoration:"none",
    marginRight:"20px",
    color:'#8493d3',
    fontSize: 20,
    padding: "8px",
    '&:hover': {
      background: "hsla(240, 48%, 41%, 0.1)",
      color: "#5d6896"
    }
  },
  search: {
    minWidth:"300px",
    width: "30vw",
    height: "35px",
    marginBottom: "5px",
    marginTop: "5px",
    marginRight: "300px"
  },
  input:{
    width: "85%",
    marginBottom: "20px"
  }
}));



export default function Navbar (props){
  const classes = useStyles();
  let history = useHistory();

  async function handleLogout(){
    props.setUser(null);
    history.push('/');
  }

  async function handleSearch(event){
    event.preventDefault();
    history.push('/search/' + event.target.searchQuery.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar>
          <Typography align="left" className={classes.title}>
              <Link className={classes.button} to="/" >C4ME</Link>
          </Typography>

          {/* search on navigation bar for some pages */}
          <Route exact path={["/search/:q", "/view_college/:id"]}>
            <Paper component="form" className={classes.search} onSubmit={handleSearch}>
            <InputBase
                name="searchQuery"
                className={classes.input}
                placeholder="Search for College"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            </Paper>
          </Route>

          {props.user &&
              <React.Fragment>
                  <Link className={classes.button} to={"/profile/"+props.user}>Profile</Link>
                  <Button className={classes.button} onClick={handleLogout}>Log out</Button>
              </React.Fragment>
          }
          {!props.user &&
              <React.Fragment>
                  <Link className={classes.button} to="/login">Login</Link>
                  <Link className={classes.button} to="/register">Register</Link>
              </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

