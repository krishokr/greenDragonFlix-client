import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';



export class MainView extends React.Component {
    //initialization to use State -> need constructor() and super()
    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        }
        

    }
    //custom component method
    setSelectedMovie(newSelectedMovie) {
        this.setState({selectedMovie: newSelectedMovie});
    }

    onBackClick() {
        if (this.state.selectedMovie) return this.setState({selectedMovie: null})
    }

    onLoggedIn(user) {
        this.setState({user});
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

    render() {
        
        const {movies, selectedMovie, user, register} = this.state;
        console.log(user)

        if (!user) {
        
            return(
                register ? (
                
                <Row className="main-view justify-content-center">
                    <RegistrationView registerUser={(username, password, name, email) => this.registerUser(username, password, name, email)} viewLogin={() => this.viewLogin()}/>
                </Row> 
                
                ) : ( 
                <Row className="main-view justify-content-center">
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={() => this.onRegister()}/>
                </Row>
                )
                
            )
        }

        if (movies.length === 0) return <div className="main-view"></div>

        return (
            <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                )
                : movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))
              }
            </Row>
          );
        
    }

    componentDidMount() {
        
        //movies already fetched -> just not being displayed until MovieView/MovieCard is
        axios.get('https://greendragonflix.herokuapp.com/movies')
            .then(response => {
                this.setState({movies: response.data});
                console.log(response.data)
            }).catch(error => console.log(error));
        
        
    }

    
}

