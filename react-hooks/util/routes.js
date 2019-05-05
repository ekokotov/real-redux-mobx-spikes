import React from "react";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import DashBoard from "../pages/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../components/privateRoute";

export default function Routes() {
    return <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignUpPage}/>
        <PrivateRoute path="/" component={DashBoard}/>
    </Switch>;
}

