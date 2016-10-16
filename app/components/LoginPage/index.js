import React, { PropTypes } from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.userLogin(this.state);
  }
  render() {
    let errors;
    if (this.props.errors) {
      errors = <ul>{this.props.errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>;
    }
    return (
      <div className="login_page__page_container">
        {errors}
        <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)} className="login_page__login_form" method="POST" action="/login">
          <input type="text" name="email" placeholder="E-mail" value={this.state.name} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  errors: React.PropTypes.array,
  userLogin: PropTypes.func,
};

export default LoginPage;
