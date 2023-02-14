const { createSlice } = require("@reduxjs/toolkit");

const initialState = {}

const timeworkSlice = createSlice({
    name: "timework",
    initialState,
    reducers: {
        addInfor: (state, action) => {
            state = action.payload;
            // console.log('Check state', state);
            return state;
        }
    }
})

export const { addInfor } = timeworkSlice.actions;
export default timeworkSlice.reducer;