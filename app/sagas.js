import { fork } from 'redux-saga/effects';
import { registrationSagas } from './containers/RegisterPage/sagas';
import { loginSagas } from './containers/LoginPage/sagas';
import { frontPageSagas } from './containers/FrontPage/sagas';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

export default startSagas(
  registrationSagas,
  loginSagas,
  frontPageSagas
);
