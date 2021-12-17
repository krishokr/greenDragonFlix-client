import React, { useState } from "react";
import PropTypes from 'prop-types';
import './registration-view.scss'

export function RegistrationView(props) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.registerUser(username, password, name, email);
    }

    const viewLogin = (e) => {
        e.preventDefault();
        props.viewLogin();
    }
    

    return(
        <>
            <form>
                <label>
                    Username: 
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} ></input>
                </label>

                <label>
                    Password:
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} ></input>
                </label>

                <label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} ></input>
                </label>

                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} ></input>
                </label>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <label>Already registered? <button onClick={viewLogin}>Login Here</button></label>
        </>
        
    )
}

RegistrationView.propTypes = {
    registerUser: PropTypes.func.isRequired,
    viewLogin: PropTypes.func.isRequired
};
