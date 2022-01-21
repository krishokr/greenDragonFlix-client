import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export function Header(props) {

    return <Container>

        <Row>
            <h1 className="logo">GREEN DRAGON</h1>
            <Button className="btn-primary-custom" onClick={() => props.logout()}>Logout</Button>
        </Row>

        

    </Container>
}