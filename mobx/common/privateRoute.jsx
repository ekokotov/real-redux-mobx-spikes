import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import stores from '../util/store';

const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} render={props => stores.authStore.user ? <Component {...props} />
    : <Redirect to={'/login'}/>}
  />);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
