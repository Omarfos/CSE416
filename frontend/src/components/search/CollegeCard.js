import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

    card: {
        marginTop: "40px",
        marginLeft: "60px"
    }

}));

export default function CollegeCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align='left'>
                        {props.college.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align='left'>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                            </Button>
            </CardActions>
        </Card>
    );
}

