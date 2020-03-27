import React, { Component } from 'react';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import Root from './components/Root';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Root></Root>
        </React.Fragment>
      </Provider>
    );
  }
}
export default App;
