import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SortOptions(props) {
  const classes = useStyles();
  const [asc, setAsc] = useState(true);
  const [strict, setStrict] = useState(false);

  const handleChangeSort = (event) => {
    const name = event.target.value;
    props.navigate(props.id, name);
  };

  return (
    <Grid container justify="flex-end" alignItems="stretch">
      <Grid item name="gridItem">
        <FormControl className={classes.formControl} name="sortingMenu">
          <Select onChange={handleChangeSort} name="selectYourOption">
            <MenuItem value="adm_rate">Admission Rate</MenuItem>
            <MenuItem value="out_state_cost">Cost of Attendance</MenuItem>
            <MenuItem id="rank" value="ranking">Ranking</MenuItem>
            <MenuItem value="recommendationScore">
              Recommendation Score
            </MenuItem>
          </Select>
          <FormHelperText>Sort</FormHelperText>
        </FormControl>
        {asc ? (
          <IconButton
            size="medium"
            onClick={() => {
              setAsc(!asc);
              props.setOrder();
            }}
          >
            <ArrowDropDown fontSize="inherit" color="primary" />
          </IconButton>
        ) : (
            <IconButton
              size="medium"
              onClick={() => {
                setAsc(!asc);
                props.setOrder();
              }}
            >
              <ArrowDropUp fontSize="inherit" color="primary" />
            </IconButton>
          )}
      </Grid>
    </Grid>
  );
}
