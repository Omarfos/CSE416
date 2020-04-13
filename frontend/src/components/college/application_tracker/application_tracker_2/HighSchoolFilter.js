import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function HighSchoolFilter(props) {

  const handleSelectHighSchool = (high_school_name) => {
    props.filterHighSchool(high_school_name)
  };


  return (
    <Autocomplete
      multiple
      id="tags-outlined"

      options={ props.allHighSchools }
      onChange={ (e, v) => handleSelectHighSchool(v) }
      filterSelectedOptions
      style={{width: "100%"}}
      renderInput={ (params) => (
        <TextField
          { ...params }
          variant="outlined"
          label="High School"
          placeholder="Select High School"
        />
      ) }
    />
  );
}
