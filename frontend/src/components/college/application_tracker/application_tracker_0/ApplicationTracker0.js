import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import axios from "axios";
// import { Grid, Button} from "@material-ui/core";
// import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';
// import LinearProgress from "@material-ui/core/LinearProgress";
// import HighSchoolCard from "../HighSchoolCard";
// import SliderFactory from "../SliderCollegeClass";
// import StatusFilter from "../StatusFilter"
// import HighSchoolFilter from "../HighSchoolFilter"
// import EnhancedTable from "../ViewApplicationsTable";
// import CustomizedTables from "../StatisticsTable";
// import Switch from "@material-ui/core/Switch";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
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



export default function ApplicationTracker1() {
    const classes = useStyles();

    const handleSearch = (e) => {
        // setStep(1);
      }

    return <SearchBar classes={ classes } handleSearch={ handleSearch } placeholder="Search for Similar High School" />;

}