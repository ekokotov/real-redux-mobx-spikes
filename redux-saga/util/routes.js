import React, {Component} from "react";
import history from './history';
import LoginPage from "../auth/login";
import SignUpPage from "../auth/signup";
import Dashboard from "../dashboard/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../common/privateRoute";
import AuthService from '../auth/authService';

class Routes extends Component {
  constructor() {
    super();
    AuthService.init();
  }

  render() {
    return (
      <Switch history={history}>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignUpPage}/>
        <PrivateRoute path="/" component={Dashboard}/>
      </Switch>
    )
  }
}

export default Routes;


