import React,{ useState, useEffect } from 'react';
import ApplicationTracker from './ApplicationTracker.js'
export default function CollegeProfile(props) {
    const [similarHighSchools, setSimilarHighSchools] = useState(null); 
    //Use to store the similar high schools.
    const [resultDisplay, setResultDisplay] = useState(null); 
    //Use to store the results for similar student profiles. 

    useEffect(() => {
        async function fetchData() {
            console.log("fetching");
        };
        fetchData();
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
        <ApplicationTracker/>
        </div>
    );
}
