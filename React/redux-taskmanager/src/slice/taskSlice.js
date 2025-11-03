import {createSlice, nanoid} from '@reduxjs/toolkit'

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                ...action.payload
            }
            state.push(newTask)
        },
        updateTask: (state, action) => {
            const update = action.payload
            const found = state.find((task) => task.id === update.id)
            if(found) {
                Object.assign(found, update)
            }
            // const foundIndex = state.findIndex((task) => task.id === action.payload)
            // if(foundIndex !== -1) {
            //     state[foundIndex] = {
            //         ...state[foundIndex], ...action.payload
            //     }
            // }
        },
        deleteTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload);
        }
    }
})

export const {addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;