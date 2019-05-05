import React, {Fragment} from "react";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import DashBoard from "../pages/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../components/privateRoute";
import DevTool from 'mobx-react-devtools';

const Routes = props => (
  <Fragment>
    <Switch>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <PrivateRoute path="/" component={DashBoard}/>
    </Switch>
    {process.env.NODE_ENV === 'development' ? <DevTool/> : null}
  </Fragment>
);

export default Routes;


