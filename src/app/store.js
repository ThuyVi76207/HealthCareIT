import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import messageReducer from 'reducers/messageSlice';
import edituserReducer from 'reducers/edituserSlice';

//tao store

const rootReducer = {
    user: userReducer,
    messages: messageReducer,
    edituser: edituserReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;