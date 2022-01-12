import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
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
        e.preventDefault();
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
    
    const onRegister = (e) => {
        e.preventDefault();
        props.onRegister();
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <Button variant="primary" type="button" onClick={onRegister}>Register</Button>
            </Form>
            
        </>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};
