
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link}  from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }, 
  navBar: {
    backgroundColor: "#eef5ff",
  },
  title: {
    flexGrow: 1,
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
   },
  }
}));

export default function Navbar (props){
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.navBar}>
          <Toolbar>
            <Typography align="left" className={classes.title}>
               <Link className={classes.button} to="/" >C4ME</Link>
            </Typography>
            {props.user &&
                <React.Fragment>
                    <Link className={classes.button} to={"/profile/"+props.user}>Profile</Link>
                    <Button className={classes.button} onClick={props.handleLogout}>Log out</Button>
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

