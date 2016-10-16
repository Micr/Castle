import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../app/components/App';
import NoMatch from '../app/components/NoMatch';
import FrontPage from '../app/containers/FrontPage';
import AdminPage from '../app/components/AdminPage';
import LoginPage from '../app/containers/LoginPage';
import User from '../app/containers/User';
import UserHome from '../app/containers/UserHome';
import RegisterPage from '../app/containers/RegisterPage';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    <Route path="admin" component={AdminPage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="users" component={User}>
      <Route path="home" component={UserHome} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
);

export default Routes;
