/**
 * @fileOverview ApplicationTracker.js is the main component in 
 * 'Application Tracker' card on 'View College' page. The
 * variable 'step' takes values [0, 1, 2] where step 0 corresponds
 * to the state in which Application Tracker displays search,
 * step 1 corresponds to the state in which Application Tracker
 * displays similar high schools selection, and step 2 displays
 * the table of applications.
 */

import React, { useState } from "react";
import ApplicationTracker1 from "./application_tracker_1/ApplicationTracker1.js"
import ApplicationTracker0 from "./application_tracker_0/ApplicationTracker0.js"
import ApplicationTracker2 from "./application_tracker_2/ApplicationTracker2.js"
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({

  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom:"20px"
  }
}));

export default function ApplicationTracker(props) {
  const classes = useStyles();

  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");


  return (
    <div>
      { props.errorMessage && (
        <div className={ classes.alert }>
          <Alert
            severity="error"
            onClose={ () => {
              props.setErrorMessage(null);
            } }
          >
            { props.errorMessage }
          </Alert>
        </div>
      )}
      {step == 0 && 
        <ApplicationTracker0 setStep={setStep} setResult={setResult} setErrorMessage={props.setErrorMessage}/>
      }
      {step == 1 && 
        <ApplicationTracker1 />
      }
      {
        step == 2 && 
          <ApplicationTracker2 college={props.college} />
      }
    </div>
  );
}
