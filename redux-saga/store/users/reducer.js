import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS, SET_FETCHING_USERS_LIMIT} from './action-types';

const initialState = {
  users: null,
  inProgress: false,
  limit: 1,
  errors: null
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        inProgress: true,
        errors: null
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        users: action.users,
        errors: null
      };

    case FETCH_USERS_FAILED:
      return {
        ...state,
        inProgress: false,
        users: null,
        errors: action.errors
      };

    case SET_FETCHING_USERS_LIMIT:
      return {
        ...state,
        limit: action.limit,
        errors: null
      };

    default:
      return state
  }
}

export default reduce;
