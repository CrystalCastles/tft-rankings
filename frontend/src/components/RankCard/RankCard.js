import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './RankCard.scss';

const rankCard = (props) => {
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../assets/emblems', false, /\.(png|jpe?g|svg)$/));
  const data = props.data;
  let rank = "";
  const precise = x => Number.parseFloat(x * 100).toPrecision(4);

  if(data.tier !== "CHALLENGER" &&
    data.tier !== "GRANDMASTER" &&
    data.tier !== "MASTER") {
      rank = data.rank;
  }

  return (
    <Container className="RankCard shine-me">
      <Row>
        <Col>
          <h2 id="SummonerName">{data.summonerName}</h2>
        </Col>
      </Row>
      
      <Row className="RankInfo justify-content-md-center">
        <Col md="auto">
          <img src={images[`${data.tier}.png`]} alt="emblem"></img>
        </Col>

        <Col md="auto">
          <h1>{data.tier + " " + rank}</h1>
          <p>Wins: {data.wins} - Losses: {data.losses}</p>
          <p>Games Played: {parseInt(data.losses) + parseInt(data.wins)}</p>
          <p>Win Percent: {precise(parseInt(data.wins) / (parseInt(data.wins) + parseInt(data.losses))) + "%"}</p>
          <p>LP: {data.leaguePoints}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default rankCard;