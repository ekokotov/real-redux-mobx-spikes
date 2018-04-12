import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_START, SIGNUP_FAILED} from './authTypes';
import AuthService from "./authService";

export function login(user) {
  return dispatch => {
    dispatch({type: LOGIN_START});
    return AuthService.login(user)
      .then(userData => dispatch(authenticate(userData)))
      .catch(error => {
        dispatch({type: LOGIN_FAILED});
        throw error;
      })
  }
}

export function authenticate(user) {
  return {type: LOGIN_SUCCESS, payload: user}
}

export function logout() {
  return {type: LOGOUT}
}

export function signup(newUser) {
  return dispatch => {
    dispatch({type: SIGNUP_START});
    return AuthService.signup(newUser)
      .then(userData => dispatch(authenticate(userData)))
      .catch(error => {
        dispatch({type: SIGNUP_FAILED});
        throw error;
      })
  }
}