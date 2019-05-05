import React, {Component} from "react";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import DashBoard from "../pages/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../components/privateRoute";
import AuthService from '../services/auth';
import {createHashHistory} from 'history'

export const history = createHashHistory({});

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
                <PrivateRoute path="/" component={DashBoard}/>
            </Switch>
        )
    }
}

export default Routes;


