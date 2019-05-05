import React, {Component} from "react";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import Index from "../pages/dashboard";
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../components/privateRoute";
import AuthService from '../store/auth/auth-service';
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
                <PrivateRoute path="/" component={Index}/>
            </Switch>
        )
    }
}

export default Routes;


