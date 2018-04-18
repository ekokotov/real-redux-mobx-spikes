import {takeEvery, takeLatest, call, put, all} from 'redux-saga/effects';
import {LOGIN_START, LOGIN_REDIRECT, SIGNUP_REDIRECT, LOGOUT, SIGNUP_START, LOGIN_SUCCESS} from "./authTypes";
import {loginError, loginRedirect, authenticate} from './authActions';
import AuthService from '../auth/authService';
import history from "../util/history";

const authSagas = [
  takeEvery(LOGIN_START, loginSaga),
  takeEvery(SIGNUP_START, signupSaga),
  takeLatest(LOGIN_REDIRECT, redirectToPageSaga),
  takeLatest(LOGOUT, logoutSaga),
  takeLatest(SIGNUP_REDIRECT, redirectToPageSaga),
  takeLatest(LOGIN_SUCCESS, loginSuccessSaga)
];

function* loginSuccessSaga(action) {
  yield call(AuthService.saveToken, action.token);
}

function* redirectToPageSaga(action) {
  yield call(history.push, action.page);
}

function* loginSaga(action) {
  try {
    const usserData = yield call(AuthService.login, action.user);
    yield all([
      put(authenticate(usserData)),
      put(loginRedirect('/'))
    ])
  } catch (e) {
    yield put(loginError(e));
  }
}


function* signupSaga(action) {
  try {
    const {user, token} = yield call(AuthService.signup, action.user);
    yield all([
      call(AuthService.saveToken, token),
      put(authenticate({user, token})),
      put(loginRedirect('/'))
    ])
  } catch (e) {
    yield put(loginError(e));
  }
}

function* logoutSaga(action) {
  yield call(AuthService.removeToken);
}

export default authSagas;
