import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from './shoppingSlice'

const store = configureStore({
    reducer: {
        shopping: shoppingReducer //root reducer
    }
})



export default store;