import {createSlice} from '@reduxjs/toolkit'

const bookSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        addBook: (state, action) => {

        },
        updateBook: (state, action) => {

        },
        removeBook: (state, action) => {

        }
    }
})
export const {addBook, updateBook, removeBook} = bookSlice.actions;
export default bookSlice.reducer;