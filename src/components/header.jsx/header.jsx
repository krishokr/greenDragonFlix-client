import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export function Header(props) {

    function viewLogoutButton() {
        console.log(props.disableLogout);
            if (!props.disableLogout) {
            return <Button className="btn-primary-custom" onClick={() => props.logout()}>Logout</Button>
        }
    }
    return <Container>

        <Row>
            <h1 className="logo">GREEN DRAGON</h1>
            {viewLogoutButton()}
        </Row>

        

    </Container>
}