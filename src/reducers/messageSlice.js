import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addSuccessMessage: (state, action) => {
            const { title, content } = action.payload;
            return [...state, { id: uuidv4(), title, content, type: 'success' }];
        },
        addErrorMessage: (state, action) => {
            const { title, content } = action.payload;
            return [...state, { id: uuidv4(), title, content, type: 'error' }];
        },
        addWarningMessage: (state, action) => {
            const { title, content } = action.payload;
            return [...state, { id: uuidv4(), title, content, type: 'warning' }];
        },
        removeMessage: (state, action) => {
            return state.filter(message => message.id !== action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSuccessMessage, addErrorMessage, addWarningMessage, removeMessage } = messageSlice.actions

export default messageSlice.reducer