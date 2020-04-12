import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import collegeName from "./colleges.json";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textfield:{
        marginTop: "20px",
        marginBottom: "20px",
    },
}))

export default function MultipleSelect(props) {
    const classes = useStyles();

    const handleSelectName = (value) => {
      if(value!=null){
        props.handleEditCollege(value.name, props.keyID);
      }
    };

    return (
        <Autocomplete
        disabled={props.disable} 
        id="tags-outlined"
        options={collegeName}
        value={{name:props.application.college}}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => value.name === option.name}
        className={classes.textfield}
        renderInput={(params) => (
            <TextField
            {...params}
            variant="outlined"
            label="College Name"
            placeholder=""
            
            />
        )}
        onChange={(e, v) => handleSelectName(v)}
        />
    );
}
