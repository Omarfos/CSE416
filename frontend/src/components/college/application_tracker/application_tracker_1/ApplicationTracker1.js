import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Grid, Button} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import LinearProgress from "@material-ui/core/LinearProgress";
import HighSchoolCard from "./HighSchoolCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";


const useStyles = makeStyles((theme) => ({
    search: {
      minWidth: "300px",
      width: "30vw",
      height: "45px",
      background: 'linear-gradient(45deg, #D4DDFD 30%, #3F51B5 90%)',
    },
    input: {
      width: "85%",
    },
    margin: {
      margin: theme.spacing(1),
      minHeight: "55px"
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: "97%"
    }
  }));



export default function ApplicationTracker1(props) {
    const classes = useStyles();

    
    const handleGoBack = () =>{
      props.setResult([]);
      props.setQuery("");
      props.setStep(0);
    }

    return <div>
    <Grid
      className={ classes.root }
      container
      spacing={ 2 }
      margins={ 3 }
      justify="center"
    >
      {/* left - side */ }
      <Grid item md={ 2 } className={ classes.filters }>
        <Grid container spacing={ 2 }>
          <Grid item md={ 12 }>
            <Typography variant="h6" align="center">
              High School Entered:
          </Typography>
            <Chip
              size="medium"
              label="{props.query}"
              clickable
              color="primary"
              onDelete={handleGoBack}
              
            />
          </Grid>
        </Grid>


        {/* right side - high school */ }
      </Grid>
      <Grid item md={ 8 }>


        { props.result ? (
         "No Simlar High School Found"
        ) : (
            props.result.map((school, index) => <HighSchoolCard college={ school } key={index} rec_score={ false } user={ props.user } />)
          ) }
      </Grid>
      <Grid item md={ 8 }>
        <Button
          variant="contained"
          color="primary"
          className={ classes.button }
          endIcon={ <NavigateNextIcon>send</NavigateNextIcon> }
          onClick={ () => { console.log('onClick'); props.setStep(2) } }
        >
          Next
        </Button>
      </Grid>
    </Grid>
  </div>

}