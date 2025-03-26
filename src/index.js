import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={2000} position='top-center' />
      <App />
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
