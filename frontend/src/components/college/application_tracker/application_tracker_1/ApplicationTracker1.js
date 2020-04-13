import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Grid, Button} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import LinearProgress from "@material-ui/core/LinearProgress";
import HighSchoolCard from "./HighSchoolCard";
// import SliderFactory from "../SliderCollegeClass";
// import StatusFilter from "../StatusFilter"
// import HighSchoolFilter from "../HighSchoolFilter"
// import EnhancedTable from "../ViewApplicationsTable";
// import CustomizedTables from "../StatisticsTable";
// import Switch from "@material-ui/core/Switch";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SearchBar from "../../../SearchBar";


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


    const [ step, setStep ] = useState(2); // step 0 - enter hs, step 1 - select among simimlar, step 2 - view applications
    const [ schools, setSchools ] = useState([ { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
    { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
    { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 },
    { name: "Witney High School", city: "New York City", state: "NY", sat: 1200, act: 30, num_students: 4000, grad_rate: 0.81, ap_enroll: 0.3 } ]); // high schools
    const [ loading, setLoading ] = useState(false);
    const [ lax, setLax ] = useState(true);
    const [ students, setStudents ] = useState([]);
    const [ cur_students, setCurrentStudents ] = useState([]);
  
    const [ filters, setFilters ] = useState({
      status: [ "accepted", "pending", "denied", "defered", "waitlisted", "withdrawn" ],
      high_schools: [],
      college_class: [],
      strict_lax: false
    });

    
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
              size="large"
              label="Whitney High School"
              clickable
              color="primary"
              // onDelete={handleDelete}
              deleteIcon={ <DoneIcon /> }
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
      <Grid item md={ 8 }>
        <Button
          variant="contained"
          color="primary"
          className={ classes.button }
          endIcon={ <NavigateNextIcon>send</NavigateNextIcon> }
          onClick={ () => { console.log('onClick'); setStep(2) } }
        >
          Next
        </Button>
      </Grid>
    </Grid>
  </div>

}