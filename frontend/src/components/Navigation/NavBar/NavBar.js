import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './NavBar.scss';

const navBar = () => {
  return (
    <Container fluid="true" className="NavBar">
      <Row>
        <Col>
          <p>tft-rankings</p>
        </Col>
      </Row>
    </Container>
  )
}

export default navBar;