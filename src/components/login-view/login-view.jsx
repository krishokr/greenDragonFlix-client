import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export function LoginView(props) {
    let navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;

        if (!username) {
            setUsernameErr('Username required.');
            isReq = false;
        }
        else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long.');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password required.');
            isReq = false;
        }  else if (password < 6) {
            setPasswordErr('Password must be 6 characters long.');
            isReq = false;
        }
        return isReq

    }


    const handleSubmit = (e) => {
        navigate("/browse");
        
        console.log(username, password);
        const isReq = validate();

        if (isReq) {

            //updates the user state of MainView and make movies list appear
            axios.post('https://greendragonflix.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                console.log('User is being logged in...' + data);
                props.onLoggedIn(data);
            })
            .catch(() => console.log("User does not exist."))
        }

    }
    

    return(
        <>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Button onClick={() => handleSubmit()}>Submit</Button>

                <Link to="/">
                    <Button variant="primary" type="button" >Register</Button>
                </Link>
            </Form>
            
        </>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  
};
