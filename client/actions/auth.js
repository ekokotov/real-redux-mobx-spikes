import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/types';
import AuthService from "../services/authService";

export function login(user) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    return AuthService.login(user)
      .then(userData => dispatch({ type: LOGIN_SUCCESS, payload: userData }))
      .catch(error => dispatch({ type: LOGIN_FAILED, payload: error }))
  }
}
