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

import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "20px",
    marginLeft: "60px",
    borderColor: "#5d6896",
  },

  learnMore: {
    marginLeft: "4px"
  },

  comma: {
    marginRight: "3px"
  },

  divider: {
    marginTop: "5px",
    marginBottom: "20px"
  },

}));


export default function CollegeCard(props) {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();

  const [ students, setStudents ] = useState([]);

  const [ open, setOpen ] = React.useState(false);
  const [ scroll, setScroll ] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [ open ]);

  
  return (
    <div>

      <Card
        raised
        className={ classes.card }
        onClick={ () => {
          // history.push({
          //   pathname: "/college/" + props.college.name,
          // })
          console.log("High School Card clicked")
        }
        }
      >
        <CardActionArea>
          <CardContent>

            <Typography
              id="college_name"
              gutterBottom
              variant="h5"
              component="h2"
              align="left"
            >
              { props.college.name }
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
                label={ "# " + props.college.city + ", " + props.college.state }
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
                label={ "# Average SAT: " + props.college.sat}
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
                label={ "# Average AP Enrollment: " + props.college.ap_enroll}
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
                label={ "# Number of Students: " + props.college.num_students}
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
                label={ "# Graduation Rate: " + Math.round(props.college.grad_rate*100) + "%"}
                color="primary"
                className={ classes.hashtag }
              />
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

