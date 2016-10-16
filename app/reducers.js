import { combineReducers } from 'redux';
import registrationPage from './containers/RegisterPage/reducers';
import loginPage from './containers/LoginPage/reducers';

export default combineReducers({
  registrationPage,
  loginPage,
});
