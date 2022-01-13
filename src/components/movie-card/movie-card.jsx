import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {useNavigate} from 'react-router-dom';


export class MovieCard extends React.Component {

    render() {
        const {movie} = this.props;
        
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    
                    <Button onClick={useNavigate(`/browse/${movie._id}`)} >Open</Button>   
                              
                </Card.Body>
            </Card>
            
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name:PropTypes.string.isRequired
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};