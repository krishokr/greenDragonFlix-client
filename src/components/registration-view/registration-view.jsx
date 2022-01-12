import React, { useState } from "react";
import PropTypes from 'prop-types';
import './registration-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
export function RegistrationView(props) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const valiate = () => {
        let isReq = true;

        if (!username) {
            setUsernameErr('Username is required.');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long.');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password is required.');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be 6 characters long.');
            isReq = false;
        }

        if (email.indexOf('@') === -1) {
            setEmailErr('Please enter a valid email.');
            isReq = false;
        }

        return isReq
    }

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
                    {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} ></Form.Control>
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} ></Form.Control>
                    {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} ></Form.Control>
                </Form.Group>

                
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

                <Col>Already registered? 
                    <Link to="/login">
                        <Button>Login Here</Button>
                    </Link>
                </Col>
            </Form>
            
        </>
        
    )
}

RegistrationView.propTypes = {
    registerUser: PropTypes.func.isRequired,
    viewLogin: PropTypes.func.isRequired
};
