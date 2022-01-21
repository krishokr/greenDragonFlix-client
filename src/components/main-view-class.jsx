import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';


import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {
    //initialization to use State -> need constructor() and super()
    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: true
        }
        
    }

    
    //custom component method
    setSelectedMovie(newSelectedMovie) {
        this.setState({selectedMovie: newSelectedMovie});
    }

    onBackClick() {
        if (this.state.selectedMovie) return this.setState({selectedMovie: null})
    }

    getMovies(token) {

        axios.get('https://greendragonflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({movies: response.data})
        })
        .catch(error => console.log(error))

    }

    onLoggedIn(authData) {
        console.log("On Logged In")
        console.log(authData);
        //this.setState({user: authData.user.Username});

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegister() {
        this.setState({register: true});
    }

    registerUser(username, password, name, email) {
        
        
        this.setState({user: {
            Username: username,
            Name: name,
            Email: email,
            Password: password,
            Birthday: "",
            FavoriteMovies: []
        }}, () => {
            
            console.log('Posting user: ' + this.state.user);
        
            axios.post('https://greendragonflix.herokuapp.com/users', this.state.user)
                    .then(request => console.log('Posted..' + request.data))
                    .catch(error => console.log(error + ' ' + this.state.user))

            console.log(username + ' ' + password + ' ' + name + ' ' + email + ' was posted.')
        })
    }

    viewLogin() {
        this.setState({register: null});
    }

    logout() {
        // useNavigate("/");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
    }

    mapMovieToMovieCard() {
        return 
        <div>
            {
                this.state.movies.map(m => (
                    <Col md={3} key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                    ))
            }
        </div>
        
    }

    render() {
        //won't work in a class-based component
    
        // console.log(this.props)
         let movieId  = 1;
        const {movies, selectedMovie, user, register} = this.state;
        
        // console.log(user);

        //Case 1: No user
        if (!user) {
            
            return  <Routes>
                
                        <Route exact path="/"  element={ 
                            <RegistrationView registerUser={(username, password, name, email) => this.registerUser(username, password, name, email)} />
                        } /> 
                        
                        
                        <Route path="/login" element={
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        } />  
                                                                        
                    </Routes>
            
        }

        //Case 2: No movies in database
        if (movies.length === 0) {
            
            return  <Routes>
                        <Route path="/" element={
                            <div className="main-view"></div>
                        } />
                    </Routes>
        }

        //Case 3: User exists and movies in database -> shows movies + movie cards
        return <>

                    <Button type="button" variant="primary" variant="link" onClick={() => this.logout()}>Logout</Button>       
        
                    <Routes>
                            <Route exact path="/browse" element={this.mapMovieToMovieCard()}>

                                

                            </Route>

                            
                            <Route path="/browse/:movieId" element={
                                       
                                <MovieView movie={movies.find(m => m._id === { movieId })} />
                                     
                            } />  
                    </Routes>
           </>
        
    }

    componentDidMount() {
        
        //movies already fetched -> just not being displayed until MovieView/MovieCard is
        axios.get('https://greendragonflix.herokuapp.com/movies')
            .then(response => {
                this.setState({movies: response.data});
                console.log(response.data)
            }).catch(error => console.log(error));
        
        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
        
    }

    
}

