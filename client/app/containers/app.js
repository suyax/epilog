import React, { Component } from 'react-native';
import { createStore } from 'redux';
import { Provider } from  'react-redux';
import EpiLogApp from './epilogApp';

import reducers from '../reducers/index';
const store = createStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EpiLogApp />
      </Provider>
    );
  }
}
