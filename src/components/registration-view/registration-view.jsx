import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './registration-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
export function RegistrationView(props) {
    let navigate = useNavigate();

    const [UserInfo, setUserInfo] = useState({});

    const [errMessages, setErrMessages] = useState({});


// only showing one error message at a time
    const valid_Username = () => {
        

        if (!UserInfo.username) {
            setErrMessages({...errMessages, usernameErr: 'Username is required.'});
            return false
        } else if (UserInfo.username.length < 2) {
            setErrMessages({...errMessages, usernameErr: 'Username must be 2 characters long.'});
            return false
        }
        setErrMessages({...errMessages, usernameErr: null})
        return true
    }


    const valid_Password = () => {
        
        if (!UserInfo.password) {
            setErrMessages({...errMessages, passwordErr: 'Password is required.'});
            return false
        } else if (UserInfo.password.length < 6) {
            setErrMessages({...errMessages, passwordErr: 'Password must be 6 characters long.'});
            return false
        }
        setErrMessages({...errMessages, passwordErr: null})
        return true
    }


    const valid_Email = () => {
      
        
        if (UserInfo.email === -1) {
            setErrMessages({...errMessages, emailErr: 'Please enter a valid email.'});
            return false
        }
        setErrMessages({...errMessages, passwordErr: null})
        return true
    }

    // only showing one at a time because it's stopping at false in the if statement
    const _isValid = () => {
        if (valid_Username() && valid_Password() && valid_Email()) {
            return true
        }
        return false;
    }

// posts user but doesn't get the authentication cookies needed to view /browse
    const handleSubmit = (e) => {
        e.preventDefault();
        if (_isValid()) {
            props.registerUser(UserInfo);
        }
    }
    
    function displayErr(error) {
        if (error) return error;
    }


    return(
        <>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" onChange={e => setUserInfo({...UserInfo, username: e.target.value})} ></Form.Control>
                    <p>{displayErr(errMessages.usernameErr)}</p>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setUserInfo({...UserInfo, password: e.target.value})} ></Form.Control>
                    <p>{displayErr(errMessages.passwordErr)}</p>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" onChange={e => setUserInfo({...UserInfo, email: e.target.value})} ></Form.Control>
                    <p>{displayErr(errMessages.emailErr)}</p>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" onChange={e => setUserInfo({...UserInfo, name: e.target.value})} ></Form.Control>
                </Form.Group>
                
                <Button className="btn-primary-custom" variant="primary" type="submit" onClick={handleSubmit}>Register</Button>

                <Col>Already registered?                   
                    <Button className="btn-primary-custom" onClick={() => navigate("/login")}>Login Here</Button>                 
                </Col>
            </Form>
            
        </>
        
    )
}

RegistrationView.propTypes = {
    registerUser: PropTypes.func.isRequired,
};
