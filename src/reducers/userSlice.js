import { createSlice } from '@reduxjs/toolkit'


const useSlice = createSlice({
    name: 'language',
    initialState: 'vi',
    reducers: {
        addLanguage: (state, action) => {
            state.push(action.payload);
        }
    }

})