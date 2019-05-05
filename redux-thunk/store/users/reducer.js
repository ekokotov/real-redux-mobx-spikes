import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS, SET_FETCHING_USERS_LIMIT} from './action-types';

const initialState = {
  users: null,
  inProgress: false,
  limit: 1
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        inProgress: true
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        users: action.payload.users
      };

    case FETCH_USERS_FAILED:
      return {
        ...state,
        inProgress: false,
        users: null
      };

    case SET_FETCHING_USERS_LIMIT:
      return {
        ...state,
        limit: action.payload.limit,
      };

    default:
      return state
  }
}

export default reduce;
