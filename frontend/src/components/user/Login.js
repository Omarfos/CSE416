import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  // const [userid, setUserid] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  // async function login(e) {
  //   e.preventDefault();
  //   let userid = e.target.userid.value;
  //   let password = e.target.password.value;
  //   fetch('http://localhost:8000/login', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({userid, password}),
  //   }).then((data) => {
  //     if (data.status === 200)
  //       setLoggedIn(true);
  //       setUserid(userid);
  //   })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };


  return (
    <Container component="main" maxWidth="xs">
      {props.user && <Redirect to="/" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.handleLogin}>
          <TextField
            variant="outlined" margin="normal" required
            fullWidth id="userid" label="Userid" name="userid" autoFocus
          />
          <TextField
            variant="outlined" margin="normal"
            required fullWidth name="password" label="Password" type="password"
            id="password" autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
