import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function HighSchoolFilter(props) {
  const handleSelectHighSchool = (values) => {
    props.navigate(props.id, values);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={["High School 1", "High School 2"]}
      onChange={(e, v) => handleSelectHighSchool(v)}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="High School"
          placeholder="Select High School"
        />
      )}
    />
  );
}
