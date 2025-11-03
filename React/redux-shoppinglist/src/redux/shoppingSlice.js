import {createSlice, current, nanoid} from '@reduxjs/toolkit'

const shoppingSlice = createSlice({
    name: "shopping",
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            const newitem = {
                id: nanoid(),
                name: action.payload,
                completed: false
            }
            state.push(newitem)
            console.log(current(state))
        },
        deleteItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        toggleItem: (state, action) => {
            const {id} = action.payload;
            const found = state.findIndex((item) => item.id === id)
            if(found !== -1) {
                state[found].completed = !state[found].completed;
            }
        },
        editItem: (state, action) => {
            const {id, newItem} = action.payload
            const found = state.find(item => item.id === id)
            if(found) {
                found.name = newItem
            }
        }
    }
})

export const {addItem, deleteItem, toggleItem, editItem} = shoppingSlice.actions;
export default shoppingSlice.reducer;