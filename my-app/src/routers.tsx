import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WeatherReport from './weatherReport';
import App from './App';

class Routers extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/weatherReport'><WeatherReport/></Route>
          <Route path='/'><App/></Route>
        </Switch>
      </Router>
    )
  }
}

export default Routers   