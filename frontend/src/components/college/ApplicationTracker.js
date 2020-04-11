import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { Grid, Button, Paper } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import LinearProgress from "@material-ui/core/LinearProgress";
import HighSchoolCard from "./HighSchoolCard";

const useStyles = makeStyles((theme) => ({
  search: {
    minWidth: "300px",
    width: "30vw",
    height: "45px",
    // marginBottom: "5px",
    // marginTop: "200px",
    background: 'linear-gradient(45deg, #D4DDFD 30%, #3F51B5 90%)',
    // aling: "center"
  },
  input: {
    width: "85%",
  },
}));

export default function ApplicationTracker(props) {
  const classes = useStyles();

  const [ step, setStep ] = useState(1);
  const [ schools, setSchools ] = useState([{name:"Witney High School", city:"New York City", state:"NY", sat:1200, act:30, num_students:4000, grad_rate:0.81, ap_enroll:0.3},
  {name:"Witney High School", city:"New York City", state:"NY", sat:1200, act:30, num_students:4000, grad_rate:0.81, ap_enroll:0.3},
  {name:"Witney High School", city:"New York City", state:"NY", sat:1200, act:30, num_students:4000, grad_rate:0.81, ap_enroll:0.3},
  {name:"Witney High School", city:"New York City", state:"NY", sat:1200, act:30, num_students:4000, grad_rate:0.81, ap_enroll:0.3}]); // high schools
  const [ loading, setLoading ] = useState(false);

  if(step==0){
    return <div>
      <Typography variant="h6" align="center">
        Search for Similar High Schools
      </Typography>
      <Paper
        component="form"
        className={classes.search}
        // onSubmit={console.log("clicked")}
      >
        <InputBase
          name="searchQuery"
          className={classes.input}
          placeholder="Enter Name of High Schools"
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>;
  }else if(step==1){
    return <div>


    <Grid
      className={ classes.root }
      container
      spacing={ 2 }
      margins={ 3 }
      justify="center"
    >
       {/* left - side */}
      <Grid item md={ 2 } className={ classes.filters }>
        <Grid container spacing={ 2 }>
          <Grid item md={ 12 }>
            <Typography variant="h6" align="center">
              High School Entered:
            </Typography>
            <Chip
              size="large"
              label="Whitney High School"
              clickable
              color="primary"
              // onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
          </Grid>
        </Grid>


        {/* right side - high schools */ }
      </Grid>
      <Grid item md={ 8 }>


        { loading ? (
          <LinearProgress variant="query" />
        ) : (
            schools.map((school) => <HighSchoolCard college={ school } rec_score={ false } user={ props.user } />)
          ) }
      </Grid>
    </Grid>



    </div>
  }else{
    return <div></div>
  }
}
