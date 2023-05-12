const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  activebar: false,
};

const ActiveBarSlice = createSlice({
  name: "activebar",
  initialState,
  reducers: {
    setActiveBarMode: (state, action) => {
      state.activebar = action.payload;
    },
  },
});

export const { setActiveBarMode } = ActiveBarSlice.actions;
export default ActiveBarSlice.reducer;
