import {createSlice} from '@reduxjs/toolkit'

const wellnessSlice = createSlice({
    name: 'wellness',
    initialState: {
        entries: []
    },
    reducers: {
        addEntry: (state, action) => {
            state.entries.push(action.payload)
        },
        clearEntries: (state, action) => {
            state.entries = [];
        }
    }
})

export const {addEntry, clearEntries} = wellnessSlice.actions;
export default wellnessSlice.reducer