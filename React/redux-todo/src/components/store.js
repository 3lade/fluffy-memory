
import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from './todoSlice'


const store = configureStore({
  reducer: {
    todos: TodoReducer
  },
});

export default store;