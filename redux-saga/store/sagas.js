import {all} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';

import authSagas from './auth/sagas';
import sagas from './users/sagas';

function* rootSaga() {
    yield all([
        ...authSagas,
        ...sagas
    ]);
}

export default rootSaga;
