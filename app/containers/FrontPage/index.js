import { connect } from 'react-redux';
import FrontPage from '../../components/FrontPage';
import { loginPage } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
  loginPage,
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(FrontPage);
