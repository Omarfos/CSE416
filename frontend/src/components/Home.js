import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Image from '../images/homeBackground.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    search: {
        position: "relative",
        left: "34%",
        top: "220px",
        width: "35%",
        alignContent:"center"
    },
    input:{
        width: "80%"
    },
    backgound:{
        minHeight: "600px",
        backgroundImage: 'url('+ Image+')',
        backgroundSize: 'cover',
    },
    bingo:{
        position: "relative",
        top:"250px",
        color: "#657ECD",
        
    }
  }));
export default function Home() {
    let history = useHistory();
    const classes = useStyles();

    async function handleSearch(event){
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
    }

    return (
        <div>
            <Paper className={classes.backgound} width="75%">
                <Paper component="form" className={classes.search} onSubmit={handleSearch}>
                <InputBase
                    name="searchQuery"
                    className={classes.input}
                    placeholder="Search for College"
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                </Paper>
                <Typography variant="h1" className={classes.bingo} >BinGo</Typography>
                <Typography variant="h6" className={classes.bingo}>Plan your path to college</Typography>
            </Paper>
        </div>
    );
}
