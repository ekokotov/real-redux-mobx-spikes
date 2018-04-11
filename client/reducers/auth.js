import AuthService from '../services/authService';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from '../actions/types';

const initialState = {
  currentUser: null,
  inProgress: false
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
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