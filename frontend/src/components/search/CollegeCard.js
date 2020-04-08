import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "20px",
    marginLeft: "60px",
    borderColor: "#5d6896"
  },

  learnMore: {
      marginLeft: "4px"
  },

  comma: {
      marginRight: "3px"
  },

  progress: {
    position: 'absolute',
    top: '32%',
    left: '69%',
  },

  percent: {
      position: 'absolute',
      top: '40%',
      left: '70%',
      color: 'black'
  },

  viewprofilesbutton: {
    position: 'absolute',
    top: '35%',
    left: '75%'
  }

}));

export default function CollegeCard(props) {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();
  const [completed, setCompleted] = React.useState(0);

  useEffect(() => {
    function progress() {
      setCompleted(prevCompleted =>
        prevCompleted >= 70 ? 70 : prevCompleted + 10
      );
    }

    const timer = setInterval(progress, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const renderCost = () => {
    if (props.college.institution_type == "Public") {
      return (
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={"# Public"}
              color="primary"
              className={classes.hashtag}
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={
                "# In-state Cost of Attendance " +
                Math.round(props.college.in_state_cost / 1000) +
                ",000 $"
              }
              color="primary"
              className={classes.hashtag}
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={
                "# Out-of-state Cost of Attendance " +
                Math.round(props.college.out_state_cost / 1000) +
                ",000 $"
              }
              color="primary"
              className={classes.hashtag}
            />
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={"# Private"}
              color="primary"
              className={classes.hashtag}
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={
                "# Cost of Attendance " +
                Math.round(props.college.in_state_cost / 1000) +
                ",000 $"
              }
              color="primary"
              className={classes.hashtag}
            />
          </Grid>
        </div>
      );
    }
  };

  return (
    <Card
      raised
      className={classes.card}
      onClick={() =>
        history.push({
          pathname: "/college/" + props.college.name,
        })
      }
    >
      <CardActionArea>
        <CardContent>

          {/* Recommendation Score, absolute position */}
          <CircularProgress variant="static" value={completed} className={classes.progress}/>
          <Typography variant="subtitle2" gutterBottom className={classes.percent}>
            78%
          </Typography>

          {/* View Similar Profiles, absolute position */}
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className={classes.viewprofilesbutton}
          >
            View Similar Profiles
          </Fab>

          <Typography
            id="college_name"
            gutterBottom
            variant="h5"
            component="h2"
            align="left"
          >
            {props.college.name}
          </Typography>   
          <Typography
            variant="h6"
            color="textSecondary"
            component="h4"
            align="left"
          >
            {props.college.ranking} in National Universities
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Chip
              variant="outlined"
              size="small"
              label={"# " + props.college.state}
              color="primary"
              className={classes.hashtagFirst}
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={classes.comma}
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={
                "# Admission Rate " +
                Math.round(props.college.adm_rate * 100) +
                " %"
              }
              color="primary"
              className={classes.hashtag}
            />
            {renderCost()}
          </Grid>
        </CardContent>
      </CardActionArea>
      {/* <CardActions className={classes.learnMore}>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

