import { configureStore } from "@reduxjs/toolkit";
import clubReducer from './clubSlice';

const store = configureStore({
    reducer: {
        clubs: clubReducer
    },
})
// console.log("hello from store")

export default store;
