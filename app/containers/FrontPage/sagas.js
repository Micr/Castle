import { browserHistory } from 'react-router';
import { take, call } from 'redux-saga/effects';
import * as constants from './constants';

export function* loginRedirectSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take('LOGIN_PAGE');
    yield call(browserHistory, 'push', constants.loginPage);
  }
}

export function* frontPageSagas() {
  yield [
    call(loginRedirectSaga),
  ];
}
