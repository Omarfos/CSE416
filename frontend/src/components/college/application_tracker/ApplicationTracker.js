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

export default function ApplicationTracker(props) {

  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");
  if (step == 0) {
    return <ApplicationTracker0 setStep={setStep} setResult={setResult}/>
  } else if (step == 1) {
    return <ApplicationTracker1 />
  } else {
    return <ApplicationTracker2 college={props.college} />
  }
}
