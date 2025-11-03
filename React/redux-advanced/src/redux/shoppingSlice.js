import {createSlice, current, nanoid} from '@reduxjs/toolkit'

const initialState = [];

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = {
                id: nanoid(),
                name: action.payload,
                completed: false
            }
            state.push(newItem)
            console.log(current(state))
        },
        deleteItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        toggleItem: (state, action) => {
            const {id} = action.payload;
            console.log(action.payload)
            const item = state.find(item => item.id === id)
            if(item) {
                item.completed = !item.completed
            }
        },
        editItem: (state, action) => {
            const {id, name} = action.payload
            if(!name) {
                return
            }
            const item = state.find((item) => item.id === id)
            if(item) {
                item.name = action.payload.name
            }
        }
    }
})

export const { addItem, deleteItem, toggleItem, editItem} = shoppingSlice.actions;
export default shoppingSlice.reducer;