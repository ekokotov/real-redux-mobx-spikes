import {takeEvery, call, put, take, actionChannel} from 'redux-saga/effects';
import {FETCH_USERS_START, SET_FETCHING_USERS_LIMIT} from "./userListTypes";
import UserService from './userListService';
import {fetchUsersSuccess, fetchUsersError} from "./userListActions";

const userListSagas = [
  takeEvery(FETCH_USERS_START, fetchUsers),
  onChangingFetchingUsersLimit() // watch SET_FETCHING_USERS_LIMIT and execute FETCH_USERS_START
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

function* onChangingFetchingUsersLimit () {
  let channel = yield actionChannel(SET_FETCHING_USERS_LIMIT);
  while(true) {
    let action = yield take(channel);
    yield fetchUsers(action);
  }
}

export default userListSagas;
