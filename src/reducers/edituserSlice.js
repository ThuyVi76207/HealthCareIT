const { createSlice } = require("@reduxjs/toolkit");

const initialState = {}

const edituserSlice = createSlice({
    name: "edituser",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state = action.payload;
            console.log('Check state', state);
            return state;
        }
    }
})

export const { addUser } = edituserSlice.actions;
export default edituserSlice.reducer;