import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';


export default function Profile(props) {
    const [userprofile, setUserProfile] = useState(null);
    const [editing, setEditing] = useState(false);

    return (
        <div>
            {console.log(props.user)}
            if current_user == requested_user:
            <br /> Account ID
            <br /> Email / changeable
            <br /> Password / change
            <br /> Name / change
            <br /> DOB / change
            <br /> Gender / change
            <br /> Address / change (City, State)
            <br /> Phone / change
                and everything below
            else:
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
