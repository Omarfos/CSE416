/**
 * @fileOverview Custom code for the Home Page.
 * See 'design' directory to understand the behavior of the page 
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Image from '../images/homeBackground.png';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logoImage from "../images/logo.png"

const useStyles = makeStyles(theme => ({
    search: {
        minWidth: "300px",
        width: "30vw",
        marginBottom: "10px"
    },
    grid: {
        position: "absolute",
        top: "40%",
    },
    input: {
        width: "80%"
    },
    backgound: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: "-1",
    },
    bingo: {
        color: "#657ECD",

    },
    logo: {
        margin: "15px",
        minWidth: "200px",
        width: "23vw",
    }
}));

export default function Home() {
    let history = useHistory();
    const classes = useStyles();

    async function handleSearch(event) {
        event.preventDefault();
        history.push('/search/college?name=' + event.target.searchQuery.value);
    }

    return (
        <div className={classes.backgound}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.grid}>
                <Grid item>
                    <Paper component="form" className={classes.search} onSubmit={handleSearch}>
                        <InputBase
                            name="searchQuery"
                            className={classes.input}
                            placeholder="Type name of college or just click search"
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item>
                    <img src={logoImage} className={classes.logo} />
                    <Typography variant="h6" className={classes.bingo}>Plan your path to college</Typography>
                </Grid>
            </Grid>
        </div>
    );
}
