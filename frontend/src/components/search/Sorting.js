import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ArrowDropUp, ArrowDropDown, LocalConvenienceStoreOutlined } from "@material-ui/icons";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';

import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  divider:{
    width:"40%",
    textAlign:"right",
    display:"inline-block",
  }
}));

export default function SortOptions(props) {
  const classes = useStyles();
  const [asc, setAsc] = useState(true);
  const [strict, setStrict] = useState(false);

  const handleChangeSort = (event) => {
    const name = event.target.value;
    console.log("SORT")
    console.log(props.id)
    console.log(name)
    props.navigate(props.id, name);
  };

  return (
      <div className={classes.divider}>
        <Tooltip title="sort by ascending or descending order" placement="bottom" arrow>
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
        </Tooltip>

        <FormControl className={classes.formControl}>
          <Select onChange={handleChangeSort} id="dropMenu">
            <MenuItem value="adm_rate">Admission Rate</MenuItem>
            <MenuItem value="out_state_cost">Cost of Attendance</MenuItem>
            <MenuItem value="ranking" id="rankOption">Ranking</MenuItem>
            <MenuItem value="recommendationScore">
              Recommendation Score
            </MenuItem>
          </Select>
          <FormHelperText>Sort</FormHelperText>
        </FormControl>
    </div>
  );
}
