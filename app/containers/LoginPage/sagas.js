import { takeEvery } from 'redux-saga';
import { browserHistory } from 'react-router';
import { call, apply, put, fork } from 'redux-saga/effects';
import Api from '../../api';
import { loginError } from './actions';

function loginSuccessful(data) {
  if (data.success) {
    return true;
  }
  return false;
}

export function* loginSaga(action) {
  try {
    const data = yield call(Api.userLogin, action.payload);
    if (loginSuccessful(data)) {
      yield apply(browserHistory, browserHistory.push, ['users/home']);
    } else {
      yield put(loginError(data.errors));
    }
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* watchLoginRequest() {
  yield* takeEvery('USER_LOGIN', loginSaga);
}

export function* loginSagas() {
  yield [
    fork(watchLoginRequest),
  ];
}
