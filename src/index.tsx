import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
/* import offers from './mocks/offers.ts'; */
import {store} from './store/index.ts';
import {Provider} from 'react-redux';
import {checkAuthAction, fetchOfferAction} from './store/api-actions.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
