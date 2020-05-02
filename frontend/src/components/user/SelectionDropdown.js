import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textfield:{
        marginTop: "15px",
        marginBottom: "20px",
    },
}))

export default function DropDownSelection(props) {
    const classes = useStyles();
    const handleSelectName = (value) => {
      if(value!=null){
        props.handleEditValue(value.name, props.keyID);
      }
    };

    return (
        <Autocomplete
        disabled={props.disable} 
        id="tags-outlined"
        options={props.valueName}
        value={{name:props.value}}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => value.name === option.name}
        className={classes.textfield}
        renderInput={(params) => (
            <TextField
            {...params}
            variant="outlined"
            label={props.placeholder}
            placeholder=""
            />
        )}
        onChange={(e, v) => handleSelectName(v)}
        />
    );
}
