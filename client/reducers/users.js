import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS} from '../actions/types';

const initialState = {
  users: null,
  inProgress: false
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USERS_START:
      return Object.assign({}, {
        inProgress: true
      });

    case FETCH_USERS_SUCCESS:
      return Object.assign({}, {
        inProgress: false,
        users: action.payload,
      });

    case FETCH_USERS_SUCCESS:
      return Object.assign({}, {
        inProgress: false,
        users: null,
      });

    default:
      return state
  }
}

export default reduce;