import React, {Component, Fragment} from "react";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Dashboard from "./pages/dashboard";
import {Switch, Route} from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/sign" component={SignUpPage}/>
        <Route exact path="/" component={Dashboard}/>
      </Switch>
    )
  }
}

export default Routes;

