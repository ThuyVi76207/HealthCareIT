import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import messageReducer from 'reducers/messageSlice';
import timeranges from 'reducers/timelineSlice';

//tao store

const rootReducer = {
    user: userReducer,
    messages: messageReducer,
    timeranges: timeranges
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;