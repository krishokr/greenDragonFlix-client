import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { BrowserRouter } from 'react-router-dom';

import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class GreenDragonFlixApplication extends React.Component{
    render() {
        return (
            <BrowserRouter>              
                <MainView />               
            </BrowserRouter>
                
        )
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(GreenDragonFlixApplication), container);