import React from "react";
import PropTypes from 'prop-types';
import './movie-view.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";

//MovieView is the UI of the details once a title is clicked
export function MovieView(props) {
    let navigate = useNavigate();

    // viewDirector() {
    //     if (this.props.movies.length === 0) return <div className="main-view" />;

    //     return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
    
    // }
    const movies = props.movies;
    const onBackClick = props.onBackClick;
    const {movieId} = useParams();
    
    //get movieId and return it to MainView
    // props.getMovieId(movieId);

    // const movie = props.movie;

    
    const movie = movies.find(m => m._id === movieId );

    
    return (<>
        
        
                <div className="movie-poster">
                    { }
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{ movie.Title }</span>
                </div>

                {/* <Route path="/directors:name" element={

                    if (movies.length === 0) return <div className="main-view" />;

                    return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                }} /> */}
                
                <div className="movie-year">
                    <span className="label">Year Released: </span>
                    <span className="value">{ movie.Year }</span>
                </div>

                {/* <Route path={`/genres:name`} render={({match, history}) => {

                    if (movies.length === 0) return <div className="main-view" />;
                    
                    return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                }} /> */}

                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{ movie.Description }</span>
                </div>
                
                <Button className="back-button" onClick={() => navigate("/browse")}>Back</Button>

            </>


        
    )
    

}