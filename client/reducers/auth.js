import AuthService from '../services/authService';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_FAILED, SIGNUP_START} from '../actions/types';

const initialState = {
  currentUser: null,
  inProgress: false
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return Object.assign({}, {
        inProgress: true
      });

    case LOGIN_SUCCESS:
      AuthService.saveToken(action.payload.token);
      return Object.assign({}, {
        inProgress: false,
        currentUser: action.payload.user,
      });

    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return Object.assign({}, {
        inProgress: false,
        currentUser: null,
      });

    case LOGOUT:
      AuthService.removeToken();
      return Object.assign({}, {
        inProgress: false,
        currentUser: null,
      });

    default:
      return state
  }
}

export default reduce;