import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import collegeName from "./colleges.json";

export default function MultipleSelect(props) {
  const handleSelectName = (value) => {
      if(value!=null){
        console.log(value.name);
        props.handleEditCollege(value.name);
      }
  };
  return (
    <Autocomplete
      disabled={props.disable} 
      id="tags-outlined"
      options={collegeName}
      defaultValue={collegeName[0]}
      getOptionLabel={(option) => option.name}
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
