import React, {Fragment} from "react";
import LoginPage from "../auth/login";
import SignUpPage from "../auth/signup";
import Dashboard from "../dashboard/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../common/privateRoute";
import DevTools from 'mobx-react-devtools';

const Routes = props => (
  <Fragment>
    <Switch>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <PrivateRoute path="/" component={Dashboard}/>
    </Switch>
    <DevTools/>
  </Fragment>
);

export default Routes;


