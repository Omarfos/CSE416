import React from 'react';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function validateEmail(email) {
    console.log("check");
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Register(props) {
    async function handleRegister(event){
        event.preventDefault();
        let first_name = event.target.firstName.value;
        let last_name = event.target.lastName.value;
        let email = event.target.email.value;
        let username = event.target.userid.value;
        let password = event.target.password.value;
        if (await validateEmail(email) === false){
            props.setError("Invalid Email Address");
        }else{  //NEED to be tested
            fetch('http://localhost:8000/checkEmailandUserId', {
                
            }).then((data)=> {
                if (data.status === 404){
                }
            })

            fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({first_name, last_name, email, username, password}),
            })
            .then((data) => {
                if (data.status === 200) {
                }
                else if (data.status === 404){
                  //props.setError("Wrong username or password");
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
                    <Alert severity="error" onClose={() => {props.setError(null)}}>{props.errorMessage}</Alert>
                </div>
            }
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form}  onSubmit={handleRegister}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField autoComplete="fname" name="firstName" variant="outlined"
                    required fullWidth id="firstName" label="First Name" autoFocus />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="outlined" required fullWidth id="lastName"
                    label="Last Name" name="lastName" autoComplete="lname" />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth id="email"
                    label="Email Address" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth id="userid"
                    label="Username use to Login" name="userid" autoComplete="userid" />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth name="password"
                    label="Password" type="password" id="password" autoComplete="current-password" />
                </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                Sign Up 
                </Button>
                <Grid container justify="flex-end">
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
