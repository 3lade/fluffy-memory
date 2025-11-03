import { configureStore } from "@reduxjs/toolkit";
import wellnessReducer from './wellnessSlice'

const store = configureStore({
    reducer: {
        wellness: wellnessReducer
    }
})

export default store