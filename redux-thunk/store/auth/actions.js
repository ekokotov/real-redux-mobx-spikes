import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_START, SIGNUP_FAILED} from './action-types';
import AuthService from "./auth-service";

export const login = user => dispatch => {
  dispatch({type: LOGIN_START});
  return AuthService.login(user)
    .then(userData => dispatch(authenticate(userData)))
    .catch(error => {
      dispatch({type: LOGIN_FAILED});
      throw error;
    })
};

export const authenticate = user => ({type: LOGIN_SUCCESS, payload: user});
export const logout = () => ({type: LOGOUT});

export const signup = newUser => dispatch => {
  dispatch({type: SIGNUP_START});
  return AuthService.signup(newUser)
    .then(userData => dispatch(authenticate(userData)))
    .catch(error => {
      dispatch({type: SIGNUP_FAILED});
      throw error;
    })
};
