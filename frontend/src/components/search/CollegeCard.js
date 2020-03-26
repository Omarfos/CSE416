import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({

    card: {
        marginTop: "40px",
        marginLeft: "60px"
    },

    learnMore: {
        marginLeft: "4px"
    },

    comma: {
        marginTop: "7px"
    },

    hashtagFirst: {
        marginTop: "10px"
    },

    hashtag: {
        marginTop: "10px",
        marginLeft: "10px"
    }

}));

export default function CollegeCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {console.log(props.college)}
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align='left'>
                        {props.college.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h4" align='left'>
                        {props.college.ranking} in National Universities
                    </Typography>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Chip variant="outlined" size="small" label={"# "+props.college.state} color="primary" className={classes.hashtagFirst}/>
                        <Typography variant="h6" color="textSecondary" component="h4" align='left' className={classes.comma}>
                            ,
                        </Typography>
                        <Chip variant="outlined" size="small" label={"# "+props.college.institution_type} color="primary" className={classes.hashtag}/>
                        <Typography variant="h6" color="textSecondary" component="h4" align='left' className={classes.comma}>
                            ,
                        </Typography>
                        <Chip variant="outlined" size="small" label={"# Admission Rate "+props.college.adm_rate*100 + " %"} color="primary" className={classes.hashtag}/>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.learnMore}>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
