import { createSlice } from '@reduxjs/toolkit'
import { createBookItem, getAllBooks, updateBookItem } from '../services/bookServices'
import UpdateBook from '../../../components/UpdateBook'

const initialState = {
    loading: false,
    error: null,
    bookItems: []
}

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.bookItems = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setBooks, setLoading} = bookSlice.actions;
export default bookSlice.reducer;

//thunks -> the manual representation of async Thunks
export const getBooks = () => async dispatch => {
    dispatch(setLoading(true))
    const data = await getAllBooks();
    dispatch(setBooks(data))
    dispatch(setLoading(false))
}

export const createBook = (newBook) => async dispatch => {
    await createBookItem(newBook)
    dispatch(getBooks())
}

export const editBook = (id, UpdateBook) => async dispatch => {
    await updateBookItem(id, UpdateBook)
    dispatch(getBooks())
}