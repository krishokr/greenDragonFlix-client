import React from 'react';
import Button from 'react-bootstrap';

export default function DirectorView(props) {



    return(
        <>
            <h1></h1>
            <div>{props.genre}</div>
            <Button onClick={props.onBackClick()}></Button>
        </>
    )
}