const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const inforDoctorSlice = createSlice({
    name: "inforDoctor",
    initialState,
    reducers: {
        addInforDoctor: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { addInforDoctor } = inforDoctorSlice.actions;
export default inforDoctorSlice.reducer;