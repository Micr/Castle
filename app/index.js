import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import routes from './routes'; // eslint-disable-line no-unused-vars
import reducer from './reducers';
import rootSaga from './sagas';
import initialState from './initialState';
import './styles.css';

const sagaMiddleware = createSagaMiddleware();
const devTools = window.devToolsExtension || (() => (noop) => noop);

const store = createStore(reducer, initialState, compose(applyMiddleware(sagaMiddleware), devTools()));

sagaMiddleware.run(rootSaga);

render(<Provider store={store}><Router routes={routes} history={browserHistory} /></Provider>,
  document.getElementById('root'));
