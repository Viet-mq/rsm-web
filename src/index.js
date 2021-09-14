import React from 'react';
import 'antd/dist/antd.min.css';
import './index.css';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './vendor';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from 'styled-components';
import DefaultTheme from './themes/default';
import store from './redux/store';

const ConnectedApp = connect(state => {
  return state;
})(App);

ReactDOM.render(
  <ThemeProvider theme={DefaultTheme}>
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
