import React from "react";

//MovieView is the UI of the details once a title is clicked
export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key)
    }

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <div className="movie-view">
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

                <button className="back-button" onClick={() => onBackClick()}>Back</button>
    
            </div>
           
        )
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback)
    }

}