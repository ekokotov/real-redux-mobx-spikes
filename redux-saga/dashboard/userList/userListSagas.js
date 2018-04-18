import {takeEvery, call, put, take, fork} from 'redux-saga/effects';
import {FETCH_USERS_START, SET_FETCHING_USERS_LIMIT} from "./userListTypes";
import {LOGIN_SUCCESS} from "../../auth/authTypes";
import UserService from './userListService';
import {fetchUsersSuccess, fetchUsersError} from "./userListActions";

const userListSagas = [
  takeEvery(FETCH_USERS_START, fetchUsers),
  takeEvery(SET_FETCHING_USERS_LIMIT, setFetchingUsersLimit)
];

function* fetchUsers (action) {
  try {
    const users = yield call(UserService.getAll, action.limit);
    yield put(fetchUsersSuccess({users}));
  } catch(error) {
    console.log(error);
    yield put(fetchUsersError({errors: error.message}));
  }
}

function* setFetchingUsersLimit (action) {
  yield fetchUsers(action);
}

export default userListSagas;
