import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    rightButtonText: '',
    patient: {}
}

export const SendModalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        addSuccessSendModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'success' };
        },
        addErrorSendModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'error' };
        },
        addWarningSendModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'warning' };
        },
        removeSendModal: (state, action) => {
            return initialState;
        },
    }
})


// Action creators are generated for each case reducer function
export const { addSuccessSendModal, addErrorSendModal, addWarningSendModal, removeSendModal } = SendModalSlice.actions

export default SendModalSlice.reducer