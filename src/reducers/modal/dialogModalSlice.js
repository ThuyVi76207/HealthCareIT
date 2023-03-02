import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    rightButtonText: '',
    patient: {}
}

export const ModalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        addSuccessModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'success' };
        },
        addErrorModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'error' };
        },
        addWarningModal: (state, action) => {
            const { title, rightButtonText, patient } = action.payload;
            return { title, rightButtonText, patient, type: 'warning' };
        },
        removeModal: (state, action) => {
            return initialState;
        },
    }
})


// Action creators are generated for each case reducer function
export const { addSuccessModal, addErrorModal, addWarningModal, removeModal } = ModalSlice.actions

export default ModalSlice.reducer