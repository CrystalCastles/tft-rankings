import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTwitch } from '@fortawesome/free-brands-svg-icons'
import './ProfileCard.scss';

const profileCard = (props) => {
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../assets/pfp', false, /\.(png|jpe?g|svg)$/));
  const data = props.data;

  return (
    <Container className="ProfileCard">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <img src={images[`${data.icon}.jpeg`]} alt="pfp"></img>
          <h1>{data.screenName}</h1>
        </Col>
      </Row>
      
      <Row className="justify-content-md-center">
        <Col className="socials" md="auto">
          <a href={"https://twitch.com/" + data.twitch} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={faTwitch} size="2x" color="#6441a5"/> <h2>/{data.twitch}</h2></a>
          <br />
          <a href={"https://twitter.com/" + data.twitter} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={faTwitter} size="2x" color="#1da1f2"/> <h2>/{data.twitter}</h2></a>
        </Col>
      </Row>
    </Container>
  )
}

export default profileCard;