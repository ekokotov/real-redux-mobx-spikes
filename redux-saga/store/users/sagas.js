import {takeEvery, call, put, take, actionChannel} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {FETCH_USERS_START, SET_FETCHING_USERS_LIMIT} from "./action-types";
import UserService from '../../services/user-list';
import {fetchUsersSuccess, fetchUsersError} from "./actions";

const sagas = [
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

export default sagas;
