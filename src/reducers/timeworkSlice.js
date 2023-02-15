const { createSlice } = require("@reduxjs/toolkit");

const initialState = {}

const timeworkSlice = createSlice({
    name: "timework",
    initialState,
    reducers: {
        addInforTime: (state, action) => {
            state = action.payload;
            // console.log('Check state', state);
            return state;
        }
    }
})

export const { addInforTime } = timeworkSlice.actions;
export default timeworkSlice.reducer;