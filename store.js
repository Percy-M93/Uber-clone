import { configureStore } from  "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

export const store = configureStore({
    reducer: {
        nav: navReducer, //Adding the nav reducer to the store
    },
});