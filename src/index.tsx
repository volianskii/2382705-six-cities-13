import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import Settings from './constants/Settings.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardsCount={Settings.cardsCount}
    />
  </React.StrictMode>
);
