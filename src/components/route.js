import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from './dashboard/dashboard';
import SelectDomain from './test/selectDomain';
import ShowQuestion from './test/showQuestion';
import Registration from './registration/components/app';
import Error from './common/error';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard}  exact/>
          <Route path="/registration" component={Registration} exact/>
          {localStorage.getItem('token') && 
            <div> 
              <Route path="/home" component={SelectDomain} exact/>
              <Route path="/test/:domain" component={ShowQuestion} />
            </div>
          }
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;