import React, { useState } from "react";
import PropTypes from 'prop-types';
import './registration-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
            <div>Already registered? <Button onClick={viewLogin}>Login Here</Button></div>
        </>
        
    )
}

RegistrationView.propTypes = {
    registerUser: PropTypes.func.isRequired,
    viewLogin: PropTypes.func.isRequired
};
