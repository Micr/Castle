import { connect } from 'react-redux';
import { registerUser } from './actions';
import RegisterPage from '../../components/RegisterPage';

const mapStateToProps = state => {
  return {
    errors: state.registrationPage.errors,
  };
};

export const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
