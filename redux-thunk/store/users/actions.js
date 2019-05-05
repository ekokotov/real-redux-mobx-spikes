import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS, SET_FETCHING_USERS_LIMIT} from './action-types';
import UserService from "../../services/user-list";

export const fetchUsers = count => dispatch => {
  dispatch({type: FETCH_USERS_START});
  return UserService.getAll(count)
    .then(users => {
      dispatch({type: FETCH_USERS_SUCCESS, payload: {users}});
      return users;
    })
    .catch(error => {
      dispatch({type: FETCH_USERS_FAILED});
      throw error;
    });
};

export const setFetchingLimit = limit => ({type: SET_FETCHING_USERS_LIMIT, payload: {limit}});
