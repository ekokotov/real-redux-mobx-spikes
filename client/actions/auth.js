import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from '../actions/types';
import AuthService from "../services/authService";

export function login(user) {
  return dispatch => {
    dispatch({type: LOGIN_START});
    return AuthService.login(user)
      .then(userData => dispatch(authenticate(userData)))
      .catch(error => dispatch({type: LOGIN_FAILED, payload: error}))
  }
}

export function authenticate(user) {
  return {type: LOGIN_SUCCESS, payload: user}
}

export function logout() {
  return {type: LOGOUT}
}
