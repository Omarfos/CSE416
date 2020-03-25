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
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    search: {
        marginTop: "250px",
        minWidth: "400px",
        marginBottom: "10px"
    },
    input:{
        width: "80%"
    },
    backgound:{
        position: 'absolute',
        left: 0,
        right: 0,
        top:0,
        bottom:0,
        backgroundImage: 'url('+ Image+')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: "-1",
    },
    bingo:{
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
            <Container className={classes.backgound}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item xs={8}>
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
                </Grid>
                <Grid item>
                    <Typography variant="h1" className={classes.bingo} >BinGo</Typography>
                    <Typography variant="h6" className={classes.bingo}>Plan your path to college</Typography>
                </Grid>
                </Grid>
            </Container>
        </div>
    );
}
