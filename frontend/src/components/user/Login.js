import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { loginUrl } from "../Url";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "32%",
  },
  paper: {
    marginTop: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#8493d3",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    fontSize: "1.5vw",
  },
  submit: {
    marginTop: "35px",
    fontSize: "1vw",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    let userid = e.target.userid.value;
    let password = e.target.password.value;
    axios.post(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      loginInfo: JSON.stringify({ userid, password }),
    })
      .then((data) => {
        if (data.status==200) {
          props.setUser(userid);
          props.setError(null);
          history.push("/");
        } else{
          props.setError("Wrong username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      { props.errorMessage && (
        <div className={ classes.alert }>
          <Alert
            severity="error"
            onClose={ () => {
              props.setError(null);
            } }
          >
            { props.errorMessage }
          </Alert>
        </div>
      ) }

      <Container component="main" className={ classes.container }>
        { props.user && <Redirect to="/" /> }

        <div className={ classes.paper }>
          <Avatar className={ classes.avatar }>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" className={ classes.title }>
            Sign in
          </Typography>
          <form className={ classes.form } onSubmit={ handleLogin }>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userid"
              label="Userid"
              name="userid"
              autoFocus
              InputProps={ {
                classes: {
                  input: classes.input,
                },
              } }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={ {
                classes: {
                  input: classes.input,
                },
              } }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
