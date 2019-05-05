import {FETCH_USERS_START, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS, SET_FETCHING_USERS_LIMIT} from './action-types';

export const fetchUsers = count => ({type: FETCH_USERS_START});
export const fetchUsersSuccess = users => ({type: FETCH_USERS_SUCCESS, ...users});
export const fetchUsersError = errors => ({type: FETCH_USERS_FAILED, errors});
export const setFetchingLimit = limit => ({type: SET_FETCHING_USERS_LIMIT, limit});
