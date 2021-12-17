import React from "react";
import PropTypes from 'prop-types';
import './movie-view.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

//MovieView is the UI of the details once a title is clicked
export class MovieView extends React.Component {

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <Col className="movie-view">
                <div className="movie-poster">
                    { movie.ImagePath }
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{ movie.Title }</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{ movie.Director.Name }</span>
                </div>
                <div className="movie-year">
                    <span className="label">Year Released: </span>
                    <span className="value">{ movie.Year }</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{ movie.Genre.Name }</span>
                </div>

                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{ movie.Description }</span>
                </div>

                <Button className="back-button" onClick={() => onBackClick()}>Back</Button>
    
            </Col>
           
        )
    }

}