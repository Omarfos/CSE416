import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../../../SearchBar";


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



export default function ApplicationTracker1() {
    const classes = useStyles();

    const handleSearch = (e) => {
        // setStep(1);
      }

    return <SearchBar classes={ classes } handleSearch={ handleSearch } placeholder="Search for Similar High School" />;

}