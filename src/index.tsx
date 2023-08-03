import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import offers from './mocks/offers.ts';
import {store} from './store/index.ts';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offers={offers}
      />
    </Provider>
  </React.StrictMode>
);
