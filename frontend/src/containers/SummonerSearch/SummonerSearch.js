import React, { Component } from 'react';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import SubmitButton from '../../components/UI/SubmitButton/SubmitButton';
import RegionSelector from '../../components/UI/RegionSelector/RegionSelector';
import RankCard from '../../components/RankCard/RankCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "../../components/VisibilitySensor/VisibilitySensor";
import axios from 'axios';
import './SummonerSearch.scss';
import pengu from '../../assets/pengu.png';
import API_HOST from '../../config';

class SummonerSearch extends Component {
  state = {
    data: null,
    name: '',
    prevSearch: null,
    region: 'na1',
    error: false,
    loading: false
  }

  handleOnInputChange = event => {
    const text = event.target.value;
    this.setState({name: text})
  }

  handleChange = event => {
    this.setState({region: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    let postData = () => {
      this.setState({loading: true, data: null, error: null})
      axios.post(`${API_HOST}/summoner-info/summoner-name`, 
        {summonerName: encodeURIComponent(this.state.name),
        region: this.state.region})
      .then(response=> {
        if(response.data.length > 0) {
          response.data.forEach(data => {
            if(data.queueType !== "RANKED_TFT") {
              this.setState({
                error: "Summoner does not play ranked TFT, please try again.",
                loading: false
              })
            } else {
              this.setState({
                data: data,
                error: null,
                loading: false
              })
              return;
            }
          })
        } else {
          this.setState({
            error: "Summoner data does not exist, please try again.",
            loading: false
          })
        }
        this.setState({
          prevSearch: [this.state.name, this.state.region]
        })
      })
      .catch(error=>{
        console.log(error)
        this.setState({
          error: "There was an error, please try again.",
          loading: false
        })
      })
    }

    if(this.state.prevSearch) {
      if(this.state.prevSearch[0].toLowerCase() === this.state.name.toLowerCase() 
        && this.state.prevSearch[1] === this.state.region) {
        return null;
      } else {
        postData();
      }
    } else {
      postData();
    }

  }

  render() {
    let card;

    if(this.state.error) {
      card = 
        <Col>
          <p id="error">{this.state.error}</p>
        </Col>
    } else if(this.state.loading) {
      card =
        <Col>
          <Spinner />
        </Col>
    }
    
    if(this.state.data) {
      card = 
        <VisibilitySensor partialVisibility once offset={{ bottom: -400 }}>
          {({ isVisible }) => (
            <Spring delay={300} to={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(400px)"}}>
              {props => 
                <Col className="card-col" style={{...props}}>
                  <RankCard data={this.state.data}></RankCard>
                </Col>
              }
            </Spring>
          )}
        </VisibilitySensor>   
    }
    
    return (
      <section className="summoner-search-section">
        <Container className="search-container">
          <Row className="landing">
            <VisibilitySensor partialVisibility once>
              {({ isVisible }) => (
                <Spring delay={300} to={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-200px)" }}>
                  {props => 
                    <Col style={{...props}} lg={6} className="headers">
                      <h1>tftrankings.com</h1>
                      <h2>Find your TFT rank and other information by entering your summoner name below.</h2>
                    </Col>
                  }
                </Spring>
              )}
            </VisibilitySensor>

            <VisibilitySensor partialVisibility once>
              {({ isVisible }) => (
                <Spring delay={300} to={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "rotate(0)" : "rotate(25deg)"}}>
                  {props => 
                    <Col style={{...props}} lg={6} xs={12}>
                      <img id="pengu" src={pengu} alt="pengu"></img>  
                    </Col>
                  }
                </Spring>
              )}
            </VisibilitySensor>
          </Row>

          <Row>
            <VisibilitySensor partialVisibility once>
              {({ isVisible }) => (
                <Spring delay={300} to={{ opacity: isVisible ? 1 : 0 }}>
                  {props => 
                    <Col style={{...props}}>
                      <form className="form-container" onSubmit={this.handleSubmit}>
                        <RegionSelector value={this.state.region} handleChange={this.handleChange}/>
                        <SearchBar text={this.state.name} handleChange={this.handleOnInputChange}/>
                        <SubmitButton />
                      </form>
                    </Col>
                  }
                </Spring>
              )}
            </VisibilitySensor>
          </Row>

          <Row>
           {card}  
          </Row>
        </Container>
      </section>
    )
  }
}

export default SummonerSearch;