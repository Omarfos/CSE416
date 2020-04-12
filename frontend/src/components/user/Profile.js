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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
    marginBottom: "30px",
    textAlign:"left"
  },
  resize:{
    fontSize:"1.5vw",
    padding:10,
  },
}));


export default function Profile(props) {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [application, setApplication] = useState([]);
  const [disable, setDisable] = useState(false);
  const classes = useStyles();


  async function handleUpdateProfile(event) {
    event.preventDefault();

    let changeStudent =
    {"id": student.id, "userid": student.userid, 
      "password": student.password,
      "residence_state": event.target.residence_state.value,
      "high_school": 165,
      "high_school_name": event.target.high_school_name.value,
      "high_school_city":event.target.high_school_city.value,
      "high_school_state": event.target.high_school_state.value,
      "major_1": event.target.major_1.value,
      "major_2": event.target.major_2.value,
      "GPA": event.target.GPA.value,
      "similar_score": null,
      "college_class": event.target.college_class.value,
      "ACT_english": event.target.ACT_english.value,
      "ACT_math":event.target.ACT_math.value,
      "ACT_reading": event.target.ACT_reading.value,
      "ACT_science": event.target.ACT_science.value,
      "ACT_composite": event.target.ACT_composite.value,
      "SAT": event.target.SAT.value, 
      "SAT_math": event.target.SAT_math.value,
      "SAT_EBRW": event.target.SAT_EBRW.value,
      "SAT_literature": event.target.SAT_literature.value,
      "SAT_US_hist": event.target.SAT_US_hist.value,
      "SAT_world_hist": event.target.SAT_world_hist.value,
      "SAT_math_I": event.target.SAT_math_I.value,
      "SAT_math_II":event.target.SAT_math_II.value,
      "SAT_eco_bio":event.target.SAT_eco_bio.value,
      "SAT_mol_bio": event.target.SAT_mol_bio.value,
      "SAT_chemistry":event.target.SAT_chemistry.value,
      "SAT_physics": event.target.SAT_physics.value,
      "num_AP_passed": event.target.num_AP_passed.value
    }

    let url = student.userid+"/edit/general";
    const res = await axios.post(url, { 
      student: changeStudent,
      application: application
    }); 
    console.log(res);
  }

  useEffect(() => {
    let url = "http://localhost:8000" + location.pathname; //    /student/q
    fetch(url)
      .then((data) => {
        if (data.status === 200) {
          async function getData() {
            let object = await data.json();
            await setStudent(object["student"]);
            setApplication(object["application"]);
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
          <form onSubmit={handleUpdateProfile} >
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
                  <Typography variant="h4">
                    Residence State:  <TextField id="residence_state" disabled={disable} defaultValue={student.residence_state} variant="outlined" InputProps={{classes: {input: classes.resize}}} />
                  </Typography> 
                </Grid>
              </Grid>
            </Container>
            <Container className = {classes.body}>
              <VerticalTabs student = {student} disable = {disable} application ={application} setApplication={setApplication}/>
            </Container>
            
            <br /><br /><br /><br /><br /><br /><br />
          </form>
        </div>
      )}
    </div>
  );
}
