import React,{ useState, useEffect } from 'react';
import ApplicationTracker from './ApplicationTracker.js';
import {useLocation} from "react-router-dom";

export default function CollegeProfile(props) {
    const [college, setCollege] = useState({name:"Stonybrook",ranking:"29"}); 
    const [similarHighSchools, setSimilarHighSchools] = useState(null); 
    //Use to store the similar high schools.
    const [resultDisplay, setResultDisplay] = useState(null); 
    //Use to store the results for similar student profiles. 
    const location = useLocation();
   
    useEffect(() => {
        let url = "http://localhost:8000" +location.pathname; //    /view_college/q
        fetch(url)
            .then(response => response.json())
            .then(
            );
    });

    async function handleUpdateFilter(event){
        event.preventDefault();
        setResultDisplay(null);
    }
    async function handleSearchSimilarHighSchool(event){
        event.preventDefault();
        setSimilarHighSchools(null);
    }
    return (
        <div>VIew College PAGE
            <br />Looking at {college.name}
            <br />college.address
            <br />college.phone
            <br />college.type (private/public)
            <br />{college.ranking} in National Universities

            <br />college Tuition (in state, out state)
            <br />college total Enrollment
            <br />college application deadline

            <h1>Overview</h1>
            <br />Early Action Availability
            <br />Early Decision Availability
            <br />Admission deadline
            <br />Average GPA, SAT MATH, SAT EBRW, ACT
            <br />Detail Enrollment: (%male, %female) (number of undergrad, grad)

            <h1>Ranking </h1>
            <br />Program rankings? Or just list top ten majors. 

            <h1>Admission </h1>
            <br />Admission Rate in %
            <ApplicationTracker/>

            <h1>Campus Life</h1>
            <br />Nearest Metropolitan Area
            <br />Freshman Housing Guarantee
            <br />Students in College Housing
            <br />Mascot
            <br />Student body (%American, %Asian, %Black..., %International)


            <h1>Map</h1>???

            <h1>Reviews</h1>
            <br />???
        </div>
    );
}
