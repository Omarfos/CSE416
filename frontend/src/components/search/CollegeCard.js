import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewProfilesButton from "./ViewProfilesButton";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "0px",
    marginLeft: "60px",
    borderColor: "#5d6896",
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

}));


export default function CollegeCard(props) {
  let history = useHistory();
  const classes = useStyles();
  const [ open, setOpen ] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [ open ]);

  function FormChip(label) {
    return (<Chip
                variant="outlined"
                size="small"s
                label={ label }
                color="primary"
              />);
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
            {FormChip("# Public")}
            {FormChip("# In-state Cost of Attendance " +
              Math.round(props.college.in_state_cost / 1000) +
              ",000 $", true)}
          {FormChip("# Out-of-state Cost of Attendance " +
              Math.round(props.college.out_state_cost / 1000) +
              ",000 $")}
          </Grid>
          { fab() }
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
            {FormChip("# Private")}
            {FormChip("# Cost of Attendance " +
                Math.round(props.college.in_state_cost / 1000) +
                ",000 $", true)}
          </Grid>
          { fab() }
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

  function fab() {
    if (props.rec_score) {
      return <ViewProfilesButton college={props.college} user={ props.user }/>;
    } else {
      return <div></div>
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
            <br/>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {FormChip("# " + props.college.state, true)}
              {FormChip("# Admission Rate " +
                  Math.round(props.college.adm_rate * 100) +
                  " %", true)}
              { renderCost() }
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </div>
  );
}

