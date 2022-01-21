import React, {useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';


import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Header } from "../header.jsx/header";
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';





export function MainView(props) {
    let navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [newUser, setNewUser] = useState(false);
    const [authData, setAuthData] = useState(null);
    const [movieId, setMovieId] = useState(null);

    

// Functions for Logout
    function logout() {
        navigate("/");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }


// Functions for LoginView
  
    function onLoggedIn(authData) {
        console.log("On Logged In")
        console.log(authData);
        setUser(authData.user.Username);

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
    }

    // why is this being called if the dependency list is empty?
    useEffect(() => {
        //only need to get movies once the user is logged in
        //getMovies should only be called once onLoggedIn is called, but needs the token from onLoggedIn, which needs authData from the user state variable
        //get movies from api and insert movies into the state variable movies
        //get movies should only be called once the user is logged in 
        
        //user logs in -> user data is passed from login-view to main-view via onLoggedIn
        async function getMovies(token) {
            let response = await axios.get('https://greendragonflix.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}`}
            })
            let data = await response.data;
            setMovies(data);
        }

        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            
            setUser(localStorage.getItem('user'));
            
            getMovies(accessToken);
        }
        console.log(authData)
    }, []);
    


    // Functions for Registering New User
    function _callRegisterUserEffect() {
        setNewUser(true);
    }

    function registerUser(UserInfo) {
        setUser({
            Username: UserInfo.username,
            Name: UserInfo.name,
            Email: UserInfo.email,
            Password: UserInfo.password,
            Movies: UserInfo.movies
        });
        _callRegisterUserEffect();
    }

    useEffect(() => {
        //need to authenticate new user and set local storage with cookies
        async function postNewUser() {
            console.log('Posting user: ' + user);
            console.log(user);
            
            await axios.post('https://greendragonflix.herokuapp.com/users', user)
            .then( response => {
                console.log(response);
                navigate("/browse");
            })
            .catch(error => console.log(error))
        }
        if (newUser) {
            postNewUser();
        }

    }, [newUser])
    

    // Functions for MovieCard
    function mapMovieToMovieCard() {
        return <Row>
            {
                movies.map(m => (
                    // <Row>
                        <MovieCard movie={m} key={m._id}/>
                    // {/* </Row> */}
                    ))
            }
        </Row>
        
    }

    // Functions for MovieView
    function getMovieId(id) {
        return setMovieId(id);
    }

    function findMovieForCard() {
        const movie = movies.find(m => m._id === movieId );
        return movie;
    }
    
    

    
    //Case 1: No user
    if (!user) {
        
        return <>
                <Header />
                    <Container>
                        
                        <Row>
                            <Col>
                                <Routes>
                                
                                    <Route exact path="/"  element={ 
                                        <RegistrationView registerUser={(UserInfo) => registerUser(UserInfo)} />
                                    } /> 
                                    
                                    <Route path="/login" element={
                                        <LoginView onLoggedIn={user => onLoggedIn(user)} />
                                    } />  
                                                                                    
                                </Routes>
                            </Col>
                        </Row>
                    </Container>
                 </>
        }

        //Case 2: No movies in database
        if (movies.length === 0) {
            
            return  <Routes>
                        <Route exact path="/" element={
                            <div className="main-view"></div>
                        } />
                    </Routes>
        }

       
        //Case 3: User exists and movies in database -> shows movies + movie cards
        return <>
        
                    <Header logout={logout()}/>
                    {/* <Button className="btn-primary-custom" onClick={() => logout()}>Logout</Button>        */}
                    <Container>
                        

                            <Routes>
                                
                                    <Route path="/browse" element={mapMovieToMovieCard()} />
                                
                                    {/* due to useParams movieId, movies.find was not working in main-view, but is working in movie-view -> because it's been switched to MovieCard and is no longer showing main-view component? */}
                                    <Route path="/browse/:movieId" element={
                                        //passing all movies to component and then matching the movie id from the movie card to the url parameter movieId
                                        // <MovieView getMovieId={getMovieId()} movie={findMovieForCard()} />

                                        <MovieView movies={movies} />
                                            
                                    }/> 
                            </Routes>
                        
                    
                       
                    </Container>
        </>
                    
        
    }

    //why does useParams to get the movieId from the url parameter work when all movies are passed to MovieView, but not when the movi

    //doesn't work because the parameter from the url doesn't exist when useParams is called in MainView -> when useParams is called in MainView, its current url is /browse --> so need to use useParams after the url changes, or inside the MovieView component

    //pass the movieId parameter in MovieView back to MainView ?


