const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const timelineSlice = createSlice({
    name: "Timeline",
    initialState,
    reducers: {
        addTime: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { addTime } = timelineSlice.actions
export default timelineSlice.reducer