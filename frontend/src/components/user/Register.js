import React from 'react';

export default function Register(props) {

    return (
        <div>Register PAGE


            <form className="form-signin" onSubmit={props.handleRegister}>
                username:
                <input></input>
                <br />
                password:
                <input></input>
                <br />
                <button className="btn btn-outline-dark text-uppercase mt-4" type="submit">Register</button>
            </form>
        </div>
    );
}
