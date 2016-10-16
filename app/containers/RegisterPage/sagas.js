import { takeEvery } from 'redux-saga';
import { browserHistory } from 'react-router';
import { call, put, take, fork } from 'redux-saga/effects';
import Api from '../../api';
import { HOME_DIR } from './constants';
import { userRegistered, registrationFailed } from './actions';

function registrationSuccessful(data) {
  if (data.success) {
    return true;
  }
  return false;
}

export function* registrationSaga(action) {
  try {
    const data = yield call(Api.registerUser, action.payload);
    if (registrationSuccessful(data)) {
      yield put(userRegistered(data));
    } else {
      yield put(registrationFailed(data.errors));
    }
  } catch (error) {
    yield put(registrationFailed(error));
  }
}

export function* registerRedirect() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take('USER_REGISTERED');
    browserHistory.push(HOME_DIR);
  }
}

export function* watchRegistrationRequest() {
  yield* takeEvery('REGISTER_USER', registrationSaga);
}

export function* registrationSagas() {
  yield [
    fork(registerRedirect),
    fork(watchRegistrationRequest),
  ];
}
