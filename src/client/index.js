import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import routes from '../common/routes';
import './index.less';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const store = createStore(combineReducers(rootReducer),applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('root')
);
