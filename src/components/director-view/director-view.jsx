import Button from '@restart/ui/esm/Button';
import React from 'react';
import Button from '@restart/ui/esm/Button';

export default function DirectorView(props) {



    return(
        <>
            <h1></h1>
            <div>{props.genre}</div>
            <Button onClick={props.onBackClick()}></Button>
        </>
    )
}