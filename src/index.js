import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';

// 스토어 주입
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import { analytics } from './shared/firebase';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

function sendToAnalytics(metric) {
  const report = JSON.stringify(metric);

  analytics.logEvent('web_vital_report', report);

  console.log({ report });
}

reportWebVitals(sendToAnalytics);
