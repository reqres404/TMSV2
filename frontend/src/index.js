import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BusesContextProvider } from './context/BusContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BusesContextProvider>
    <App />
    </BusesContextProvider>
  </React.StrictMode>
);

