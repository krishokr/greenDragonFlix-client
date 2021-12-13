import React from 'react';

import { MovieCard } from './movie-card';
import { MovieView } from './movie-view';


export class MainView extends React.Component {
    //initialization to use State -> need constructor() and super()
    constructor() {
        super();

        this.state = {
            movies: [
            {Title: "pirates", _id: 1, ImagePath: "", Year: 2014, Genre: "Fantasy", Director: "steven",Description: "...descr1"}, 
            {Title: "indiana", _id: 2, ImagePath: "", Year: 200, Genre: "Adventure", Director: "joe", Description: "...descr2"}
            ],
            selectedMovie: null
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

    

    render() {
        //object destructuring
        const {movies, selectedMovie} = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {
                    selectedMovie ? <MovieView movie={selectedMovie} onBackClick={() => this.onBackClick()} /> : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie) }} />)
                }
                
            </div>
        );
        
    }
}

