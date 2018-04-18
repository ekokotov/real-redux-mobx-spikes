import {fork, all} from 'redux-saga/effects';

import authSagas from '../auth/authSagas';
import userListSagas from '../dashboard/userList/userListSagas';

function* rootSaga() {
  yield all([
    authSagas,
    userListSagas
  ]);
}

export default rootSaga;
