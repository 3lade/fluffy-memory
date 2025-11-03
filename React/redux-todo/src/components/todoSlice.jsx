import {createSlice, nanoid, } from '@reduxjs/toolkit'

const initialState = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: nanoid(),
                text: action.payload,
                completed: false
            })
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload)
            if(todo) {
                todo.completed = !todo.completed
            }
        }
    }
})

export const {addTodo, deleteTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer;