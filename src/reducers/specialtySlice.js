import {createSlice} from '@reduxjs/toolkit'


const specialty = createSlice({
    name:'specialty',
    initialState: [],
    reducers: {
        addSpecialty(state, action) {
            state.push(action.payload);
        },
        removeSpecialty(state, action) { 
           

        },

    }

})