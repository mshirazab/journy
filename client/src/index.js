import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import profileStore from './stores/profileStore';

ReactDOM.render(
  <Provider profileStore={profileStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
