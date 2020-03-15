import React from 'react';
import {Link} from "react-router-dom";

export default function Login(props) {

    return (
        <div>Login PAGE

            <form className="form-signin" onSubmit={props.handleLogin}>
                username:
                <input></input>
                <br />
                password:
                <input></input>
                <br />
                <button className="btn btn-outline-dark text-uppercase mt-4" type="submit">Login</button>
                <Link to="/register">Sign Up</Link>
            </form>
        </div>
    );
}
