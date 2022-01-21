import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom';


export function MovieCard(props){
    let navigate = useNavigate();

    const movie = props.movie;
    
    return(
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={"/img/"+movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    
                    <Button className="btn-primary-custom" onClick={() => navigate(`/browse/${movie._id}`)}>Open</Button>   
                              
                </Card.Body>
            </Card>
        </Col>
    )
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