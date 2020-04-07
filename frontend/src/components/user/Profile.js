import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "auto"
  },
  header: {
    height: 200,
    backgroundImage: "url(" + Image + ")",
    backgroundSize: "cover",
  },
  // filters: {
  //     margin: "10%"
  // }
}));


export default function Profile(props) {
  const location = useLocation();
  const [userprofile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    let url = "http://localhost:8000" + location.pathname; //    /student/q
    fetch(url)
      //.then(response => response.json())
      .then((data) => {
        if (data.status === 200) {
          async function getData() {
            // let college = await data.json();
            // setCollege(college);
          }
          getData();
        }
      });
  }, []);

  return (
    <div>
      if current_user == requested_user:
      <br /> Account ID
      <br /> Email / changeable
      <br /> Password / change
      <br /> Name / change
      <br /> DOB / change
      <br /> Gender / change
      <br /> Address / change (City, State)
      <br /> Phone / change and everything below else:
      <br /> Expected College Graduation
      <br /> SAT, ACT Scores, Other Scores
      <br /> Current College (if any)
      <br /> College City, State, Major, College GPA, College Classes taken
      <br /> Current/Last High School(if any)
      <br /> High School City, State, High School GPA, AP classes taken/scores
      <br /> Colleges Applied, Status (Whether Questionable)
    </div>
  );
}
