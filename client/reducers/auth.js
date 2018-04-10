import AuthService from '../services/authService';
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/types';

const initialState = {
  user: null,
  token: null,
  loading: false
};

function reduce(state = initialState, action = {}) {
  //debugger;
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, {
        loading: true
      });

    case LOGIN_SUCCESS:
      AuthService.saveToken(action.payload.token);
      return Object.assign({}, {
        loading: false,
        user: action.payload.user,
        token: action.payload.token
      });

    case LOGIN_FAILED:
      return Object.assign({}, {
        loading: false,
        user: null,
        token: null,
      });

    default:
      return state
  }
}

export default reduce;