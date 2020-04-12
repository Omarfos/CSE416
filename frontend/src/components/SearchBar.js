import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Image from "../images/homeBackground.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import logoImage from "../images/logo.png";
const useStyles = makeStyles((theme) => ({

}));
export default function SearchBar(props) {

    return(
        <Paper
        component="form"
        className={props.classes.search }
        onSubmit={(e) => {props.handleSearch(e)}}
        >
        <InputBase
          name="searchQuery"
          className={props.classes.input }
          placeholder={props.placeholder}
        />
        <IconButton
          type="submit"
          className={props.classes.iconButton }
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
}