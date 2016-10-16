import React, { PropTypes } from 'react';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
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
    this.props.registerUser(this.state);
  }
  render() {
    let errors;
    if (this.props.errors) {
      errors = <ul>{this.props.errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>;
    }
    return (
      <div className="register_page__page_container">
        {errors}
        <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)} className="register_page__register_form" method="PUT" action="/register">
          <input type="text" name="email" placeholder="E-mail" value={this.state.name} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} />
          <input type="password" name="password2" placeholder="Repeat Password" value={this.state.password2} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  errors: React.PropTypes.array,
  registerUser: PropTypes.func,
};

export default RegisterPage;
