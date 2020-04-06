import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import majors from "./majors.json";

export default function MajorFilter(props) {
  const handleSelectMajor = (values) => {
    props.navigate(props.id, values);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={majors}
      onChange={(e, v) => handleSelectMajor(v)}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Major"
          placeholder="Select Subject"
        />
      )}
    />
  );
}
