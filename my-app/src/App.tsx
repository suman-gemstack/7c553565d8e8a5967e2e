import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { log } from 'console';

interface Props extends RouteComponentProps {

}

interface State {
  countryName: string,
  isValid: boolean
}

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      countryName: "",
      isValid: true,
    }
  }

  onChange = (e: any) => {
    this.setState({ countryName: e.target.value, isValid: true})
  }

  getData = () => {
    fetch(`https://restcountries.eu/rest/v2/name/${this.state.countryName.trim()}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 404 ) {
        this.setState({ isValid: false })
        return
      }
       
      this.props.history.push("/weatherReport", {data: data[0]})
    }
    )
    .catch((error) => {
        console.log("error", error)
        this.setState({ isValid: false })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <TextField
         placeholder= "Enter country"
         value={this.state.countryName}
         onChange={this.onChange}
        />
        <h4 style={{ color: "red"}}>
          {!this.state.isValid && "Pealse enter correct country name"}
        </h4>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getData} 
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default withRouter(App);
