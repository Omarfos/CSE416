import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../images/homeBackground_blur.png";
import Container from "@material-ui/core/Container";
import VerticalTabs from "./ProfileTabs";
import Avatar from '@material-ui/core/Avatar';
import PortraitImage from "../../images/student_portrait.png";
import Grid from '@material-ui/core/Grid';
import NotFound from "../NotFound";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    // top: 0,
    // bottom: 0,
    backgroundImage: "url(" + Image + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: "-1",
    color:"#4b4b4b"
  },
  header:{
    marginTop: 70,
    maxWidth:"70%"
  },
  body:{
    maxWidth:"70%",
    marginTop:40,
  },
  portraitDiv:{
    width:"20%",
    marginRight: "40px"
  },
  portrait:{
    width:"100%",
    height:"100%"
  },
  information:{
    marginTop:"40px",
    marginLeft:"40px"
  }, 
  username:{
    color: "#8493d3",
    marginBottom: "30px"
  }
}));


export default function Profile(props) {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [disable, setDisable] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let url = "http://localhost:8000" + location.pathname; //    /student/q
    fetch(url)
      .then((data) => {
        if (data.status === 200) {
          async function getData() {
            let student = await data.json();
            await setStudent(student);
            if(location.pathname.substring(9) == props.user){
              setDisable(false);
            };
          }
          getData();
        }
      });
  }, []);

  return (
    <div>
      {!student && <NotFound />}
      {student && (
        <div className = {classes.root}>
          <Container className = {classes.header}>
            <Grid container direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
              <Grid item className={classes.portraitDiv}>
                <Avatar alt="student"  src={PortraitImage} className ={classes.portrait}/>
              </Grid>
              <Grid item className={classes.information}>
                <Typography variant="h3" className = {classes.username}>
                  {student.userid}
                </Typography>
                <Typography variant="h5">
                  State: {student.residence_state}
                </Typography>
              
              
              </Grid>
            </Grid>
          </Container>
          <Container className = {classes.body}>
            <VerticalTabs student = {student} disable = {disable}/>
          </Container>
          <br /><br />
          <br />
          <br /><br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
