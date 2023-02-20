const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const profileuserSlice = createSlice({
    name: "profileuser",
    initialState,
    reducers: {
        addProfileUser: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { addProfileUser } = profileuserSlice.actions;
export default profileuserSlice.reducer;