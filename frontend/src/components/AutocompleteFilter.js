import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AutocompleteFilter(props) {

  const handleSelect = (value) => {
    props.filter(value)
  };


  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={ props.options }
      onChange={ (e, v) => handleSelect(v) }
      filterSelectedOptions
      defaultValue={props.defaultValue}
      style={{width: "100%"}}
      renderInput={ (params) => (
        <TextField
          { ...params }
          variant="outlined"
          label={props.label}
          placeholder={props.placeholder}
        />
      ) }
    />
  );
}
