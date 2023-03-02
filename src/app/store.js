import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import messageReducer from 'reducers/messageSlice';
import editcommonReducer from 'reducers/editcommonSlice';
import timeworkReducer from 'reducers/timeworkSlice';
import inforDoctorReducer from 'reducers/inforDoctorSlice';
import profileuserReducer from 'reducers/profileuserSlice';
import dialogModalReducer from 'reducers/modal/dialogModalSlice';
//tao store

const rootReducer = {
    user: userReducer,
    messages: messageReducer,
    editcommon: editcommonReducer,
    timework: timeworkReducer,
    inforDoctor: inforDoctorReducer,
    profileuser: profileuserReducer,
    dialogModal: dialogModalReducer,

}

const store = configureStore({
    reducer: rootReducer,
});

export default store;