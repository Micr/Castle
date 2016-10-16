import React, { PropTypes } from 'react';

const FrontPage = ({ loginPage }) =>
  <div className="front_page__login_button" onClick={loginPage}>Front page</div>;

FrontPage.propTypes = {
  loginPage: PropTypes.func,
};

export default FrontPage;
