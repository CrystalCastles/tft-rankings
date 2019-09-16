import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Footer.scss';

const footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col className="footer-col">
            <p>tftrankings.com isn’t endorsed by Riot Games and doesn’t reflect the views or 
              opinions of Riot Games or anyone officially involved in producing or managing League of Legends. 
              League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, 
              Inc. League of Legends © Riot Games, Inc.
            </p>
            <p id="contact">Contact - <a href="https://twitter.com/chunkygerbil" rel="noopener noreferrer" target="_blank">@chunkygerbil</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default footer;