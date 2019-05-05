import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {Store} from "../store";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {state} = React.useContext(Store);
    return (
        <Route {...rest} render={props => state.auth.currentUser ? <Component {...props} />
            : <Redirect to={'/login'}/>}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
};

export default PrivateRoute;
