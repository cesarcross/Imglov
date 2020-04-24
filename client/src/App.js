import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Toolbar from './components/toolbar/Toolbar';
import AppRouter from './components/router/AppRouter';
import configureStore from './store/store';

import './styles/styles.css';

const appStore = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={ appStore }>
        <Router>
          <div>
            <Toolbar />
            <AppRouter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
