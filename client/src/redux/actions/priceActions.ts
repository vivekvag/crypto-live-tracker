import axios from 'axios';
import { AppDispatch } from '../store';

import {
  fetchPricesRequest,
  fetchPricesSuccess,
  fetchPricesFailure
} from '../reducers/priceReducer';

const api_url = 'https://crypto-live-tracker-1va3jkbp5-vivek-guptas-projects-8162e112.vercel.app/';

export const fetchPrices = (symbol: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchPricesRequest());

  try {
    const response = await axios.get(`${api_url}/api/stocks/data/${symbol}`);
    dispatch(fetchPricesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPricesFailure(error?.message));
  }
};
