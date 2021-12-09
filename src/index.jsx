import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class GreenDragonFlixApplication extends React.Component{
    render() {
        return (
            <div className="green-dragon-flix">
                <div>Welcome to Green Dragon Flix, a place to store all your favorite movies.</div>
            </div>
        )
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(GreenDragonFlixApplication), container);