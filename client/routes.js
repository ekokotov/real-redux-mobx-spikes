import React, {Component} from "react";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Dashboard from "./pages/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "./components/privateRoute";
import AuthService from './services/authService';

class Routes extends Component {
  constructor() {
    super();
    AuthService.init();
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/sign" component={SignUpPage}/>
        <PrivateRoute exact path="/" component={Dashboard}/>
      </Switch>
    )
  }
}

export default Routes;


