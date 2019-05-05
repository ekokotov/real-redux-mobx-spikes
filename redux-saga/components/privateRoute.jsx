import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} render={props => isAuthenticated ? <Component {...props} />
    : <Redirect to={'/login'}/>}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(state => {
  return {
    isAuthenticated: !!state.auth.currentUser
  }
}, null)(PrivateRoute);
