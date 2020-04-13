import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function StatusFilter(props) {
  const handleSelectStatus = (status) => {
    console.log('status', status)
    props.filterStatus(status)
    // props.navigate(props.id, values);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={ [ "pending", "accepted", "denied", "deferred", "waitlisted", "withdrawn" ] }
      onChange={ (e, v) => handleSelectStatus(v) }
      filterSelectedOptions
      style={{width: "100%"}}
      renderInput={ (params) => (
        <TextField
          { ...params }
          variant="outlined"
          label="Application Status"
          placeholder="Select Status"
        />
      ) }
    />
  );
}
