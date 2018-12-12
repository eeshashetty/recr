import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from './dashboard/dashboard';
import SelectDomain from './quiz/selectDomain';
import ShowQuestion from './quiz/showQuestion';
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
              <Route path="/quiz/:domain" component={ShowQuestion} />
            </div>          
          }
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;