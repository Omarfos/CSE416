import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { similarHighSchoolUrl } from "../../../Url";
import TextField from '@material-ui/core/TextField';
import highSchoolName from "../../../user/highSchools.json";
import DropDownSelection from "../../../user/SelectionDropdown";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    search: {
      marginTop: "",
      minWidth: "300px",
      width: "60%",
    },
    dropdown: {
      width: "85%",
    },
    margin: {
      margin: theme.spacing(1),
      minHeight: "55px"
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: "97%"
    },
    detail_textfield:{
      margin: "20px",
    }
  }));



export default function ApplicationTracker1(props) {
    const classes = useStyles();
    const [highSchool, setHighSchool] = useState("Whitney High School");

    async function handleEditHighSchool(value, index){
      setHighSchool(value)
    }

    const handleSearch = (e) => {
      e.preventDefault();
      const high_school_name= highSchool;
      console.log(highSchool)
      axios
      .get(similarHighSchoolUrl, {
        responseType: "json",
        params: {
          high_school: highSchool,
          high_school_city: e.target.city.value,
          high_school_state: e.target.state.value
        }
      })
      .then((response) => {
        if(response.status == 200){
          props.setResult(response.data);
          props.setErrorMessage(null);
          props.setQuery(high_school_name);
          props.setStep(1);
        }
        else{
          props.setResult([]);
          props.setErrorMessage("No similar high school found.");
        }
      })
      .catch((error) => {
        props.setResult([]);
        props.setErrorMessage("No similar high school found.");
      });
    }

    return (
      <div>
        <form onSubmit={(e) => {handleSearch(e)}} className = {classes.search} >
            <DropDownSelection className={classes.dropdown} required value={highSchool} disable={props.disable} handleEditValue={handleEditHighSchool} valueName = {highSchoolName} placeholder = "High School Name"/>
            <TextField id="city" label="City" required className={classes.detail_textfield}/>
            <TextField id="state" label="State" required className={classes.detail_textfield}/>
            <Button type="submit">Search</Button>
        </form>
      </div>
    );

}