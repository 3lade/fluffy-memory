import { createSlice, nanoid, createAsyncThunk, current } from '@reduxjs/toolkit'


export const fetchClubs = createAsyncThunk('clubs/fetchClubs', async () => {
    return ['Photography Club', 'Literature Club', 'Tech Club'];
    //will create a side Effect , so use useEffect hook while faking this api when using it
})
const initialState = {
    availableClubs: [],
    members: {},
    loading: false
}

// console.log("hello from clubSlice")

const clubSlice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        addMember: (state, action) => {
            const {club, name, email, interest} = action.payload;
            //checking if members are already in club
            if(!state.members[club]) {
                state.members[club] = [];
            }
            //finding the email if member registerd in the club
            //to avoid duplicates
            const emailExists = state.members[club].find((member) => member.email === email)
            if(emailExists) {
                return;
            }

            const newMember = {
                id: nanoid(),
                name,
                email,
                interest
            }
            state.members[club].push(newMember);
            console.log(current(state))
        },
        updateMember: (state, action) => {
            const {id, club, name, email, interest} = action.payload;
            const members = state.members[club];
            const index = members.findIndex((member) => member.id === id)
            if(index !== -1) {
                members[index] = {id, name, email, interest}
            }
        },
        removeMember: (state, action) => {
            const {club, id} = action.payload;

            const members = state.members[club];
            const index = members.findIndex((member) => member.id === id)
            if(index !== -1) {
                state.members[club].splice(index, 1);
            }
        },
        clearMembers: (state) => {
            state.members = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClubs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchClubs.fulfilled, (state, action) => {
                state.loading = false
                state.availableClubs = action.payload
            })
    }
})

export const { addMember, updateMember, removeMember, clearMembers } = clubSlice.actions;
export default clubSlice.reducer;