import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../images/homeBackground_blur.png';


const useStyles = makeStyles(theme => ({
    body: {
        marginTop: "100px",
    },
    backgound2: {
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
}));


export default function NotFound(props) {
    const classes = useStyles();

    return (
        <div className={classes.backgound2}>
            <h1 className={classes.body}>Oops! Page not found!</h1>
        </div>
    );
}
