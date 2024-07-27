import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PriceTable from './components/priceTable';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PriceTable />
  </Provider>
);
