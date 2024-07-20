import { combineReducers } from "@reduxjs/toolkit";
import priceReducer from "./priceReducer";

const rootReducer = combineReducers({
    prices: priceReducer
})

export default rootReducer;


export type RootState = ReturnType<typeof rootReducer>;