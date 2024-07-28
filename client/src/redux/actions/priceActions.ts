import axios from 'axios';
import { AppDispatch } from '../store';

import {
  fetchPricesRequest,
  fetchPricesSuccess,
  fetchPricesFailure
} from '../reducers/priceReducer';

const api_url =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:10000');

export const fetchPrices = (symbol: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchPricesRequest());

  try {
    const response = await axios.get(`${api_url}/api/stocks/data/${symbol}`);
    dispatch(fetchPricesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPricesFailure(error?.message));
  }
};
