import React, { useEffect, useState } from "react";
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

    const [submitClicked, setSubmitClicked] = useState(null);

    const validUsername = () => {
        if (!username) {
            setUsernameErr('Username required.');
            return false;
        }
        if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long.');
            return false;
        }
        return true;
    }

    const validPassword = () => {
        if (!password) {
            setPasswordErr('Password required.');
            return false;
        }  
        if (password < 6) {
            setPasswordErr('Password must be 6 characters long.');
            return false;
        }
        return true;
    }

   const isValid = () => {
       if (validUsername && validPassword) {
           return true;
       }
       return false;
   }


    useEffect(() => {
           async function postLogin() {
                
                //should use useEffect here...
                    //updates the user state of MainView and make movies list appear
                    await axios.post('https://greendragonflix.herokuapp.com/login', {
                        Username: username,
                        Password: password
                    })
                    .then(response => {
                        const data = response.data;
                        console.log(data);
                        props.onLoggedIn(data);
                        navigate("/browse");
                    })
                    .catch(() => console.log("User does not exist."))
            }
            if (isValid() && submitClicked) {
                console.log('posting user...')
                postLogin();
                console.log('user has been logged in.')
            }

    },[username, password, submitClicked])

    const handleSubmit = () => {
        
        console.log(username, password);
        setSubmitClicked(true);

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

                <Button className="btn-primary-custom" onClick={() => handleSubmit()}>Submit</Button>

                
                <Button onClick={() => navigate("/")}className="btn-primary-custom" type="button" >Register</Button>
            </Form>
            
        </>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  
};
