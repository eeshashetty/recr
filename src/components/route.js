import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from './dashboard/dashboard';
import SelectDomain from './quiz/selectDomain';
import ShowQuestion from './quiz/showQuestion';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard}  exact/>
          {localStorage.getItem('token') && 
            <div>
              <Route path="/selectDomain" component={SelectDomain} exact/>
              <Route path="/quiz/:domain" component={ShowQuestion} />
            </div>          
          }
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;