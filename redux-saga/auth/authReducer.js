import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_FAILED, SIGNUP_START} from './authTypes';

const initialState = {
  currentUser: null,
  inProgress: false,
  errors: null
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
        errors: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        currentUser: action.user,
        errors: null
      };

    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        currentUser: null,
        errors: action.errors
      };

    case LOGOUT:
      return {
        ...state,
        inProgress: false,
        currentUser: null,
        errors: null
      };

    default:
      return state
  }
}

export default reduce;
