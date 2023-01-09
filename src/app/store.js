import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';

//tao store

const rootReducer = {
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;