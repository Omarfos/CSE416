
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from '../style/css'



export default function Navbar (props){
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.navBar}>
          <Toolbar>
            <Typography align="left" className={classes.title}>
               <Button className={classes.button} href="/" >C4ME</Button>
            </Typography>
            {props.user &&
                <React.Fragment>
                    <Button className={classes.button} href={"/profile/"+props.user}>Profile</Button>
                    <Button className={classes.button} onClick={props.handleLogout}>Log out</Button>
                </React.Fragment>
            }
            {!props.user &&
                <React.Fragment>
                    <Button className={classes.button} href="/login" color="inherit">Login</Button>
                    <Button className={classes.button} href="/register" color="inherit">Register</Button>
                </React.Fragment>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
}

