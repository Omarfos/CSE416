import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from '../style/css'
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';


export default function Home() {
    let history = useHistory();
    const classes = useStyles();

    async function handleSearch(event){
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
    }

    return (
        <div>
            <div> 
            <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search for College"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            </Paper>
                {/* Search Bar<input name="searchQuery"></input>
                <button type="submit">Search</button> */}
            </div>
        </div>
    );
}
