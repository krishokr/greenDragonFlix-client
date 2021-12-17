import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //updates the user state of MainView and make movies list appear
        props.onLoggedIn(username);
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
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
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
