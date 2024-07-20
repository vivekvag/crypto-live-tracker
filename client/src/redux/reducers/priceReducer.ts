import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Price {
    symbol: string;
    timestamp: string;
    price: number;
}

interface PriceState {
    data: Price[];
    loading: boolean;
    error: string | null;
    symbol: string;
}

const initialState: PriceState = {
    data: [],
    loading: false,
    error: null,
    symbol: 'bitcoin',
};

const priceSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        fetchPricesRequest(state){
            state.loading = true;
            state.error = null;
        },
        fetchPricesSuccess(state, action: PayloadAction<Price[]>){
            state.loading = false;
            state.data = action.payload;
        },
        fetchPricesFailure(state, action: PayloadAction<string>){
            state.loading = false;
            state.error = action.payload
        },
        setSymbol(state, action: PayloadAction<string>){
            state.symbol = action.payload
        }
    }
});

export const {
    fetchPricesRequest,
    fetchPricesSuccess,
    fetchPricesFailure,
    setSymbol
  } = priceSlice.actions;

export default priceSlice.reducer