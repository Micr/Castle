import { connect } from 'react-redux';
import LoginPage from '../../components/LoginPage';
import * as actions from './actions';

const mapStateToProps = state => ({
  errors: state.loginPage.errors,
});

export default connect(mapStateToProps, actions)(LoginPage);
