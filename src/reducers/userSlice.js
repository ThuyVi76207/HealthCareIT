import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: 'vi',
}

const UserSlice = createSlice({
    name: 'Changelanguage',
    initialState,
    reducers: {
        addLanguage: (state, action) => {
            state.language = action.payload;
        }
    }

})

export const { addLanguage } = UserSlice.actions;
export default UserSlice.reducer;