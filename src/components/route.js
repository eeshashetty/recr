import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from './dashboard/dashboard';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;