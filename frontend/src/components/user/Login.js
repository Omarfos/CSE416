import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


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
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  async function handleLogin(e) {
    e.preventDefault();
    let userid = e.target.userid.value;
    let password = e.target.password.value;
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, password}),
    }).then((response) => response.json())
    .then((data) => {
      if (data.SUCCESS) {
        props.setUser(userid);
        props.setError(null);
      }
      else if (data.ERROR){
        props.setError("Wrong username or password");
      }
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div>
      {props.errorMessage &&
        <div className={classes.alert}>
          <Alert severity="error" onClose={() => {props.setError(null)}}>{props.errorMessage}</Alert>
        </div>
      }

      <Container component="main" maxWidth="xs">
        {props.user && <Redirect to="/" />}
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
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
    </div>
  );
}
