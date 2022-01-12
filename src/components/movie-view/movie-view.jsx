import React from "react";
import PropTypes from 'prop-types';
import './movie-view.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";

//MovieView is the UI of the details once a title is clicked
export class MovieView extends React.Component {

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <Router>
                <Col className="movie-view">
                    <div className="movie-poster">
                        { movie.ImagePath }
                    </div>
                    <div className="movie-title">
                        <span className="label">Title: </span>
                        <span className="value">{ movie.Title }</span>
                    </div>

                    <Route path={`/directors:name`} render={({match, history}) => {

                        if (movies.length === 0) return <div className="main-view" />;

                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                    }} />
                    
                    <div className="movie-year">
                        <span className="label">Year Released: </span>
                        <span className="value">{ movie.Year }</span>
                    </div>

                    <Route path={`/genres:name`} render={({match, history}) => {

                        if (movies.length === 0) return <div className="main-view" />;
                        
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    }} />

                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{ movie.Description }</span>
                    </div>
                    
                    <Button className="back-button" onClick={() => onBackClick()}>Back</Button>
                    
        
                </Col>
            </Router>
        )
    }

}