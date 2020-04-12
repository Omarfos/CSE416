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
import Rating from '@material-ui/lab/Rating';

import Divider from '@material-ui/core/Divider';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EnhancedTable from "./ViewProfilesTable";



const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "0px",
    marginLeft: "60px",
    borderColor: "#5d6896",
  },

  learnMore: {
    marginLeft: "4px"
  },

  comma: {
    marginRight: "3px"
  },

  progress: {
    position: 'absolute',
    top: '15%',
    left: '86%',
  },

  percent: {
    position: 'absolute',
    top: '22%',
    left: '87%',
    color: 'black'
  },

  viewprofilesbutton: {
    position: 'absolute',
    top: "70%",
    right: "3%",
    zIndex:"99"
  },

  divider: {
    marginTop: "5px",
    marginBottom: "20px"
  },

  emptyspace: {
    //marginTop: "34px"
  },

  rating: {
    position: 'absolute',
    top: "70%",
    right: "3%"
  }

}));


export default function CollegeCard(props) {
  const classes = useStyles();
  let history = useHistory();
  // const [completed, setCompleted] = React.useState(0);

  // useEffect(() => {
  //   function progress() {
  //     setCompleted(prevCompleted =>
  //       prevCompleted >= 70 ? 70 : prevCompleted + 10
  //     );
  //   }

  //   const timer = setInterval(progress, 100);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const [ students, setStudents ] = useState([]);

  const [ open, setOpen ] = React.useState(false);
  const [ scroll, setScroll ] = React.useState("paper");

  const handleClickOpen = scrollType => (e) => {
    e.stopPropagation();
    setOpen(true);
    handleViewSimilarProfiles(props.college.name, 'gshea')
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [ open ]);

  const renderCostNextLine = () => {
    if (props.college.institution_type == "Public") {
      return <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Chip
            variant="outlined"
            size="small"
            label={
              "# In-state Cost of Attendance " +
              Math.round(props.college.in_state_cost / 1000) +
              ",000 $"
            }
            color="primary"
          />
          <Typography
            variant="h6"
            color="textSecondary"
            component="h4"
            align="left"
            className={ classes.comma }
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
          />
        </Grid>
      </div>
    } else {
      return <div></div>
    }

  }

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
              className={ classes.comma }
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={ "# Public" }
              color="primary"
              className={ classes.hashtag }
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={ classes.comma }
            >
              ,
            </Typography>
          </Grid>
          { fab() }
          {/* <Rating name="read-only" value={ Math.round(Math.random() * 4) + 1 } readOnly className={ classes.rating } /> */}
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
              className={ classes.comma }
            >
              ,
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              label={ "# Private" }
              color="primary"
              className={ classes.hashtag }
            />
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
              className={ classes.comma }
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
              className={ classes.hashtag }
            />
          </Grid>
          { fab() }
          {/* <Rating name="read-only" value={ Math.round(Math.random() * 4) + 1 } readOnly className={ classes.rating } /> */}
        </div>
      );
    }
  };

  function RecommendationScore() {
    if (props.rec_score) {
      return <div>
        {/* Recommendation Score, absolute position */ }
        <CircularProgress variant="static" size={ 55 } value={ props.college.score } thickness={ 2 } className={ classes.progress } />
        <Typography variant="h6" gutterBottom className={ classes.percent }>
          { props.college.score }%
            </Typography>
      </div>
    } else {
      return <div></div>
    }
  }


  const handleViewSimilarProfiles = (college, userid) => {

    axios.get("http://localhost:8000/similar", {
      responseType: "json",
      params: {
        userid: userid,
        college: college
      }
    }).then((response) => {
      let r = response.data.map((s) => {
        return s.fields;
      })
      setStudents(r)
    });
  };

  function fab() {
    if (props.rec_score) {
      return <div>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          className={ classes.viewprofilesbutton }
          onClick={ (e)=>handleClickOpen(e) }
        >
          View Similar Profiles
        </Fab>

        <Dialog
          maxWidth="lg"
          open={ open }
          onClose={ handleClose }
          scroll={ scroll }
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Similar Profiles in {props.college.name}</DialogTitle>
          <DialogContent dividers={ scroll === "paper" }>
            
            <EnhancedTable students={ students } />
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose } color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>


      </div>
    } else {
      return <div className={ classes.emptyspace }></div>
    }
  }



  return (
    <div>
      <Card
        className={ classes.card }
        onClick={ () => {
          history.push({
            pathname: "/college/" + props.college.name,
          })
        }
        }
      >
        <CardActionArea>
          <CardContent>
            {/* { fab() } */}
            { RecommendationScore() }

            <Typography
              id="college_name"
              gutterBottom
              variant="h5"
              component="h2"
              align="left"
            >
              { props.college.name }
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h4"
              align="left"
            >
              { props.college.ranking } in National Universities
            </Typography>
            <Divider className={ classes.divider } />
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Chip
                variant="outlined"
                size="small"
                label={ "# " + props.college.state }
                color="primary"
                className={ classes.hashtagFirst }
              />
              <Typography
                variant="h6"
                color="textSecondary"
                component="h4"
                align="left"
                className={ classes.comma }
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
                className={ classes.hashtag }
              />
              { renderCost() }
            </Grid>
            { renderCostNextLine() }
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </div>
  );
}

