import AuthService from '../../services/auth';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_FAILED, SIGNUP_START} from './action-types';
import {LOGIN_REDIRECT} from "../../../redux-saga/store/auth/action-types";

const initialState = {
  currentUser: null,
  inProgress: false
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true
      };

    case LOGIN_SUCCESS:
      AuthService.saveToken(action.payload.token);
      return {
        ...state,
        inProgress: false,
        currentUser: action.payload.user,
      };

    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      console.log(action);
      return {
        ...state,
        inProgress: false,
        currentUser: null,
        errors: action.errors
      };

    case LOGOUT:
      AuthService.removeToken();
      return {
        ...state,
        inProgress: false,
        currentUser: null,
      };

    case LOGIN_REDIRECT:
    default:
      return state
  }
}

export default reduce;
