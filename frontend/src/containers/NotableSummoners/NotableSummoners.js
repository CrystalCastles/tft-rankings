import React, { Component } from 'react';
import RankCard from '../../components/RankCard/RankCard';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './NotableSummoners.scss';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "../../components/VisibilitySensor/VisibilitySensor";
import ContentLoader from 'react-content-loader'
import API_HOST from '../../config';

const notables = [
  {
    name: 'dogdogdog',
    screenName: 'dogdog',
    region: 'na1',
    icon: 'pfp-dogdog',
    twitch: 'dogdog',
    twitter: 'dogdog'
  },
  {
    name: 'Hafu',
    screenName: 'Hafu',
    region: 'na1',
    icon: 'pfp-hafu',
    twitch: 'hafu',
    twitter: 'itshafu'
  },
  {
    name: 'Scarra',
    screenName: 'Scarra',
    region: 'na1',
    icon: 'pfp-scarra',
    twitch: 'scarra',
    twitter: 'scarra'
  },
  {
    name: 'DisguisedToast69',
    screenName: 'DisguisedToast',
    region: 'na1',
    icon: 'pfp-dt',
    twitch: 'disguisedtoast',
    twitter: 'disguisedtoast'
  },
  // {
  //   name: 'Keane tf',
  //   screenName: 'TSM Keane',
  //   region: 'na1',
  //   icon: 'pfp-keane',
  //   twitch: 'keanelol',
  //   twitter: 'ly_keane'
  // },
  {
    name: 'Kyo9487',
    screenName: 'Kyo大叔',
    region: 'na1',
    icon: 'pfp-kyo',
    twitch: 'kyo1984123',
    twitter: 'kyo1984123'
  },
  {
    name: 'Becca Tilts',
    screenName: 'Becca',
    region: 'na1',
    icon: 'pfp-becca',
    twitch: 'becca',
    twitter: 'beccatilts'
  },
  // {
  //   name: 'Byronze',
  //   screenName: 'Reckful',
  //   region: 'na1',
  //   icon: 'pfp-reckful',
  //   twitch: 'reckful',
  //   twitter: 'byronbernstein'
  // },
]

class NotableSummoners extends Component {
  state = {
    data: [],
    error: false,
    loading: true
  }
  
  async componentDidMount() {
    this.setState({loading: true, error: false})

    for(let player of notables) {
      await axios.post(`${API_HOST}/summoner-info/summoner-name`, 
        {summonerName: player.name,
        region: player.region})
      .then(response => {
        for(let x of response.data) {
          if(x.queueType === "RANKED_TFT") {
            this.setState({
              data: [...this.state.data, x],
            })
          }
        }
        this.setState({
          error: false,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: "There was an error, please try again"
        })
      })
    }
  }

  // MyLoader = () => (
  //   <ContentLoader
  //     className="Loader" 
  //     height={500}
  //     width={400}
  //     speed={2}
  //     primaryColor="#e2e2e2"
  //     secondaryColor="#ffffff"
  //   >
  //     <rect x="73" y="10" rx="3" ry="3" width="255" height="60" /> 
  //   </ContentLoader>
  // )

  render() {
    let profileCard;
    let summonerRow;

    let rankCard = (
      notables.map(x => {
        return (
          <Col key={x.icon} className="content-loader">
            <ContentLoader
              className="SecondLoader" 
              height={110}
              width={255}
              speed={2}
              primaryColor="#e2e2e2"
              secondaryColor="#ffffff"
            >
              <rect rx="3" ry="3" width="255" height="110" /> 
            </ContentLoader>
          </Col>
        )
      })
    );

    if(this.state.error) {
      summonerRow = (
        <Col>
          <p id="error">{this.state.error}</p>
        </Col>
      )
    } else if(this.state.data.length === notables.length) {
        rankCard = (
          this.state.data.map(x => {
            return (
              <Col key={x.summonerName} className="rank-card">
                <RankCard data={x}></RankCard>
              </Col>
            )
          })
        )
      }

    profileCard = (
      notables.map(player => {
        return (
          <Col key={player.name + player.icon} md="6" className="d-flex align-items-center profile-card">
            <ProfileCard data={player}></ProfileCard>
          </Col>
        )
      })
    )

    summonerRow = (
      rankCard.map((currCard, i) => {
        if (i%2 === 0) {
          return (           
            <VisibilitySensor key={currCard.key + i} partialVisibility once>
            {({ isVisible }) => (
              <Spring delay={300} to={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-200px)" }}>
                {props =>
                  <Row style={{...props}}>
                    {profileCard[i]}
                    {currCard}
                  </Row>
                }
              </Spring>
            )}
            </VisibilitySensor> 
          )
        } else {
          return (
            <VisibilitySensor key={currCard.key + i} partialVisibility once>
            {({ isVisible }) => (
              <Spring delay={300} to={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(200px)" }}>
                {props =>
                  <Row style={{...props}}>
                    {currCard}
                    {profileCard[i]}
                  </Row>
                }
              </Spring>
            )}
          </VisibilitySensor> 
          )
        }
      })    
    )
      
    return (
      <section className="notable-summoners-section">
        <h1>Notable Summoners</h1>
        <Container>
          {summonerRow}
        </Container>
      </section>
    )
  }
}

export default NotableSummoners;