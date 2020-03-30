/**
 * @fileOverview Custom code for the Not Found Page.
 * See 'design' directory to understand the behavior of the page 
 */

import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../images/homeBackground_blur.png';
import notFoundImage from "../images/404.png"


const useStyles = makeStyles(theme => ({
    image: {
        width: "27%",
        left: "37%",
        position: "absolute",
        top: "23%",
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
            <img src={notFoundImage} className={classes.image} />
        </div>
    );
}
