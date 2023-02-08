const { createSlice } = require("@reduxjs/toolkit");

const initialState = {}

const editcommonSlice = createSlice({
    name: "editcommon",
    initialState,
    reducers: {
        addInfor: (state, action) => {
            state = action.payload;
            console.log('Check state', state);
            return state;
        }
    }
})

export const { addInfor } = editcommonSlice.actions;
export default editcommonSlice.reducer;