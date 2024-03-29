import {all, fork} from 'redux-saga/effects';

export function* rootSaga() {
    yield all([].map(saga => fork(saga)));
}
