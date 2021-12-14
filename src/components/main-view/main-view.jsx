import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {
    //initialization to use State -> need constructor() and super()
    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        }
        

    }
    //custom component method
    setSelectedMovie(newSelectedMovie) {
        this.setState({selectedMovie: newSelectedMovie});

        // this.state.selectedMovie ? this.setState({selectedMovie: null}) : this.setState({selectedMovie: newSelectedMovie});
        
    }

    onBackClick() {
        if (this.state.selectedMovie) return this.setState({selectedMovie: null})
    }

    onLoggedIn(user) {
        this.setState({user});
    }

    

    render() {
        //object destructuring
        const {movies, selectedMovie, user} = this.state;

        if (!user) return <div className="main-view"><LoginView onLoggedIn={user => this.onLoggedIn(user)}/></div>

        if (movies.length === 0) return <div className="main-view"></div>;

        return (
            <div className="main-view">
                {
                    selectedMovie ? <MovieView movie={selectedMovie} onBackClick={() => this.onBackClick()} /> : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie) }} />)
                }
                
            </div>
        );
        
    }

    componentDidMount() {
        
        axios.get('https://greendragonflix.herokuapp.com/movies')
            .then(response => {
                this.setState({movies: response.data});
                console.log(response.data)
            }).catch(error => console.log(error));

    }

    
}

