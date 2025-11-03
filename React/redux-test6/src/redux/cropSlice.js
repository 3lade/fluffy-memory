import {createSlice, nanoid} from '@reduxjs/toolkit'

const cropSlice = createSlice({
    name: 'crops',
    initialState: [],
    reducers: {
        addCrop: (state, action) => {
            const newCrop = {
                id: nanoid(),
                ...action.payload
            }
            state.push(newCrop)
        },
        updateCrop: (state, action) => {
            const update = action.payload;
            const found = state.find((crop) => crop.id === update.id)
            if(found) {
                Object.assign(found, update)
            }
        },
        deleteCrop: (state, action) => {
            return state.filter((crop) => crop.id !== action.payload)
        }
    }
})

export const {addCrop, updateCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;