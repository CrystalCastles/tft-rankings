import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import RegionSelector from '../../components/UI/RegionSelector/RegionSelector';
import RankTable from '../../components/RankTable/RankTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RankButton from '../../components/UI/RankButton/RankButton';
import axios from 'axios';
import API_HOST from '../../config';

import './TopSummoners.scss';

class TopSummoners extends Component {
  state = {
    data: null,
    error: null,
    loading: true,
    region: 'na1',
    rank: 'challengers',
    chalStyle: {color: "#C38927"},
    gmStyle: {color: "#05212A"},
    mStyle: {color: "#05212A"}
  }

  componentDidMount() {
    axios.post(`${API_HOST}/challengers/region`,
      {region: 'na1'})
    .then(response => {
      this.setState({
        data: response.data.entries,
        loading: false,
        error: false
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({
        error: "There was an error, please try again.",
        loading: false
      })
    })
  }

  handleChange = event => {
    this.setState({
      region: event.target.value,
      loading: true
    });

    axios.post(`${API_HOST}/${this.state.rank}/region`,
      {region: event.target.value})
    .then(response => {
      this.setState({
        data: response.data.entries,
        loading: false,
        error: false
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({
        error: "There was an error, please try again.",
        loading: false
      })
    })
  }

  handleClick = event => {
    if(event.target.value === "challengers") {
      this.setState({
        rank: event.target.value,
        loading: true,
        chalStyle: {color: "#C38927"},
        gmStyle: {color: "#05212A"},
        mStyle: {color: "#05212A"}
      });
    } else if(event.target.value === "grandmasters") {
      this.setState({
        rank: event.target.value,
        loading: true,
        chalStyle: {color: "#05212A"},
        gmStyle: {color: "#C38927"},
        mStyle: {color: "#05212A"}
      });
    } else if(event.target.value === "masters") {
      this.setState({
        rank: event.target.value,
        loading: true,
        chalStyle: {color: "#05212A"},
        gmStyle: {color: "#05212A"},
        mStyle: {color: "#C38927"}
      });
    }

    axios.post(`${API_HOST}/${event.target.value}/region`,
      {region: this.state.region})
    .then(response => {
      this.setState({
        data: response.data.entries,
        loading: false,
        error: false
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({
        error: "There was an error, please try again.",
        loading: false
      })
    })
  }

  render() {
    let table;

    if(this.state.error) {
      table = <p id="error">{this.state.error}</p>
    } else if(this.state.loading) {
      table = <Spinner />
    } else {
      table = <RankTable data={this.state.data} />
    }

    return (
      <section className="top-summoners-section">
        <h1>Top Summoners</h1>
        <Container fluid="true" className="Container">
          <Row className="Header">
            <Col><span>REGION: </span><RegionSelector id="RegionSelect" value={this.state.region} handleChange={this.handleChange}/></Col>
            <Col><RankButton click={this.handleClick} value="challengers" style={this.state.chalStyle} name="CHALLENGERS" /></Col>
            <Col><RankButton click={this.handleClick} value="grandmasters" style={this.state.gmStyle} name="GRANDMASTERS" /></Col>
            <Col><RankButton click={this.handleClick} value="masters" style={this.state.mStyle} name="MASTERS" /></Col>
          </Row>

          {table}
        </Container>
      </section>
    )
  }
}

export default TopSummoners;