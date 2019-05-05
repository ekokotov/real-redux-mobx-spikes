import {takeEvery, takeLatest, call, put, all, actionChannel, take} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {LOGIN_START, LOGIN_REDIRECT, SIGNUP_REDIRECT, LOGOUT, SIGNUP_START, LOGIN_SUCCESS} from "./action-types";
import {loginError, loginRedirect, authenticate, signupError} from './actions';
import AuthService from './auth-service';
import {history} from "../../util/routes";

export default [
    takeEvery(LOGIN_START, loginSaga),
    loginOnSuccessSaga(), // watch LOGIN_SUCCESS action and save token into LocalStorage + redirect to dashboard
    takeEvery(SIGNUP_START, signupSaga),
    takeLatest([SIGNUP_REDIRECT, LOGIN_REDIRECT], redirectToPageSaga),
    takeLatest(LOGOUT, logoutSaga)
];

function* loginOnSuccessSaga() {
    let channel = yield actionChannel(LOGIN_SUCCESS);
    while (true) {
        let {token} = yield take(channel);
        yield all([
            call(AuthService.saveToken, token),
            put(loginRedirect('/'))
        ]);
    }
}

function* redirectToPageSaga(action) {
    yield call(history.push, action.page);
}

function* loginSaga(action) {
    try {
        const userData = yield call(AuthService.login, action.user);
        yield put(authenticate(userData));
    } catch (e) {
        yield put(loginError(e));
    }
}


function* signupSaga(action) {
    try {
        const {user, token} = yield call(AuthService.signup, action.user);
        yield put(authenticate({user, token}));
    } catch (e) {
        yield put(signupError(e));
    }
}

function* logoutSaga() {
    yield call(AuthService.removeToken);
}
