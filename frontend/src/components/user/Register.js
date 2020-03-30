import React from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "32%",
    },
    paper: {
        marginTop: "40%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginTop: "10px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#8493d3",
    },
    input: {
        fontSize: "1.5vw"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        marginTop: "35px",
        fontSize: "1vw"
    },
}));

async function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Register(props) {
    async function handleRegister(event) {
        event.preventDefault();
        let first_name = event.target.firstName.value;
        let last_name = event.target.lastName.value;
        let email = event.target.email.value;
        let userid = event.target.userid.value;
        let password = event.target.password.value;
        if (await validateEmail(email) === false) {
            props.setError("Invalid Email Address");
        } else {
            fetch('http://localhost:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ first_name, last_name, email, userid, password }),
            }).then((response) => response.json())
                .then((data) => {
                    if (data.ERROR) {
                        props.setError("ERROR: user already exists");
                    }
                    else if (data.SUCCESS) {
                        props.setUser(userid);
                        props.setError(null);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    const classes = useStyles();
    return (
        <div>
            {props.errorMessage &&
                <div className={classes.alert}>
                    <Alert severity="error" onClose={() => { props.setError(null) }}>{props.errorMessage}</Alert>
                </div>
            }
            {props.user && <Redirect to="/" />}
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" className={classes.title}>
                        Sign up
                </Typography>
                    <form className={classes.form} onSubmit={handleRegister}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="fname" name="firstName" variant="outlined"
                                    required fullWidth id="firstName" label="First Name" autoFocus InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" required fullWidth id="lastName"
                                    label="Last Name" name="lastName" autoComplete="lname" InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="email"
                                    label="Email Address" name="email" autoComplete="email" InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="userid"
                                    label="Username use to Login" name="userid" autoComplete="userid" InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="password"
                                    label="Password" type="password" id="password" autoComplete="current-password" InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }} />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            Sign Up
                    </Button>
                        <Grid container justify="flex-end" className={classes.title}>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}
