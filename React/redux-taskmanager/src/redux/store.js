import {configureStore} from '@reduxjs/toolkit'
import taskReducer from '../slice/taskSlice'

export const store = configureStore({
    reducer: {
        tasks: taskReducer
    }
})