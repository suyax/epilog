import React, { Component } from 'react-native';
import { createStore, applyMiddleWare } from 'redux';
import { Provider } from  'react-redux';
import thunk from 'redux-thunk';
import EpiLogApp from './epilogApp';

import reducers from '../reducers/index';
const createStoreWithMiddleware = applyMiddleware(thunk);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EpiLogApp />
      </Provider>
    );
  }
}
