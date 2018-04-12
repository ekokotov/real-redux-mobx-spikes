import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS} from '../actions/types';
import UserService from "../services/userService";

export function fetchUsers(count) {
  return dispatch => {
    dispatch({type: FETCH_USERS_START});
    return UserService.getAll(count)
      .then(users => dispatch({type: FETCH_USERS_SUCCESS, payload: users}))
      .catch(error => {
        dispatch({type: FETCH_USERS_FAILED});
        throw error;
      });
  }
}
