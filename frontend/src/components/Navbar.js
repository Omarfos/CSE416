import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar (props){
    return (
           <div>         
            {props.user &&
                <React.Fragment>
                    <Link to={"/profile/"+props.user}>Profile</Link>
                    <button onClick={props.handleLogout}>Log out</button>
                </React.Fragment>
            }
            {!props.user &&
                <React.Fragment>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </React.Fragment>
            }
            <br />
            <br />
            <br />
            </div>
        
    );
}

