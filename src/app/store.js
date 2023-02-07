import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import messageReducer from 'reducers/messageSlice';

//tao store

const rootReducer = {
    user: userReducer,
    messages: messageReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;