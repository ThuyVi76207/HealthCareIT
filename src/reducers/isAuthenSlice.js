const { createSlice } = require("@reduxjs/toolkit");

const initialState = false;

const isAuthenSlice = createSlice({
    name: "isAuthen",
    initialState,
    reducers: {
        isAuthenChecked: (state, action) => {
            state = action.payload;
            console.log("Check state", state)
            return state;
        }
    }
})

export const { isAuthenChecked } = isAuthenSlice.actions;
export default isAuthenSlice.reducer;