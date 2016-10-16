import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import express from 'express';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { renderToString } from 'react-dom/server';
import * as loginActions from '../app/containers/LoginPage/actions';
import * as registrationActions from '../app/containers/RegisterPage/actions';
import initialState from '../app/initialState';
import routes from '../app/routes';
import reducers from '../app/reducers';
import { validateRegData } from '../utils/validate';
import User, { createUser, getUserByEmail, getUserById, comparePassword } from '../models/user';

const store = createStore(reducers, initialState);

const router = express.Router({ mergeParams: true });
const apiRouter = express.Router({ mergeParams: true });
router.use('/api', apiRouter);

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid password' });
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  getUserById(id, (err, user) => {
    done(err, user);
  });
});

export const reactRoute = (location, res, next) => {
  match({ routes, location }, (err, redirectLocation, renderProps) => { // eslint-disable-line consistent-return
    if (err) return next(err);

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next(new Error('Missing render props'));
    }

    const reactApp = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const state = store.getState();
    fs.readFile(path.join('build', 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        const body = file.toString().replace('{{ react_app }}', reactApp)
          .replace('{{ redux_state }}', JSON.stringify(state));
        res.send(body);
      }
    });
  });
};

export const loginRedirect = (res, next, data) => {
  store.dispatch(loginActions.loginError(data));
  reactRoute('/login', res, next);
};

export const registrationRedirect = (res, next, data) => {
  store.dispatch(registrationActions.registrationFailed(data));
  reactRoute('/register', res, next);
};

export const registerHandler = (req, res, next) => {
  const validateResult = validateRegData(req);
  if (!validateResult.success) {
    if (req.isAjaxRequest) {
      res.send({
        success: false,
        errors: validateResult.errors,
      });
    } else {
      registrationRedirect(res, next, validateResult.errors);
      res.redirect('/register');
    }
    return;
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  createUser(newUser, (err, message) => {
    if (err) {
      res.send({
        success: false,
        errors: [message],
      });
    } else {
      res.send({ success: true });
    }
  });
};

export const loginHandler = (req, res, next) => {
  passport.authenticate('local', (err, user, message) => {
    if (err) { return next(err); }
    if (!user) {
      if (req.isAjaxRequest) {
        res.send({
          success: false,
          errors: [message],
        });
      } else {
        loginRedirect(res, next, [message]);
      }
      return;
    }
    req.logIn(user, err => {
      if (err) { return next(err); }
      if (req.isAjaxRequest) {
        res.send({ success: true });
      } else {
        return res.redirect('/users/home');
      }
    });
  })(req, res, next);
};

router.get(/\/login|\/register/, (req, res, next) => {
  if (req.user) {
    res.redirect('/users/home');
  } else {
    next();
  }
});

router.get('/users/home', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
})

router.get('*', (req, res, next) => {
  reactRoute(req.url, res, next);
});

router.put('/register', registerHandler);
router.post('/login', loginHandler);

apiRouter.put('/users/create', registerHandler);
apiRouter.post('/users/login', loginHandler);

export default router;
