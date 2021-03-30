import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from '@material-ui/core';


interface Props extends RouteComponentProps {
  location: any
}

interface State {
  capitalDetail: any
  isDeatilFetched: boolean
}

const API_KEY = "4f00fc3bd1ec71f09ae24b02ac88defc";

class WeatherReport extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state={
      capitalDetail: {
        temperature: "",
        precip: '',
        wind_speed: "",
        weather_icons: []
      },
      isDeatilFetched: false
    }
  }

  getWeatherDetail = () => {
    console.log(this.props.location.state.data)
    let url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${this.props.location.state.data.capital}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({ capitalDetail: data.current, isDeatilFetched: true})
      console.log(data)
    })
    .catch((error) => {
      console.log("error", error)
    })
  }


  render() {
    return(
      <div style={{ textAlign: "center"}}>
        <h1>Country Information</h1>
        <h3>capital: {this.props.location.state.data.capital} </h3>
        <h3>population: {this.props.location.state.data.population} </h3>
        <h3>latlng: {this.props.location.state.data.latlng[0]}, {this.props.location.state.data.latlng[1]}</h3>
        <img
        style={{ height: 200, width: 400}}
        src={this.props.location.state.data.flag}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.getWeatherDetail()}
          >
            Capital Weather
          </Button>
        </div>
        {this.state.isDeatilFetched &&
        <>
        <h1>Capital Information:</h1>
        <h3>temperature: {this.state.capitalDetail.temperature} </h3>
        <h3>wind speed: {this.state.capitalDetail.wind_speed}</h3>
        <h3>precip: {this.state.capitalDetail.precip}</h3>
        <img src={this.state.capitalDetail.weather_icons[0]}/>
        </>
        }
      </div>
    );
  }
}

export default withRouter(WeatherReport)