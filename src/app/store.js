import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import messageReducer from 'reducers/messageSlice';
import editcommonReducer from 'reducers/editcommonSlice';

//tao store

const rootReducer = {
    user: userReducer,
    messages: messageReducer,
    editcommon: editcommonReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;