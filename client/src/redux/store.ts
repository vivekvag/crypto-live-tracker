import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { loadState, saveState } from "../utils/localstorage";

const preLoadedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: preLoadedState
});

store.subscribe(()=>{
    saveState(store.getState())
})

export default store;

//we are inferring the types from the stor itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

