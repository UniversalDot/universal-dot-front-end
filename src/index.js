import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import store from './store/store';
import { Provider } from 'react-redux';

import { SubstrateContextProvider } from './substrate-lib';

ReactDOM.render(
  <Provider store={store}>
    <SubstrateContextProvider>
      <App />
    </SubstrateContextProvider>
  </Provider>,
  document.getElementById('root')
);
