import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToastState {
    msg: string
    successMsg: string
    errorMsg: string
    warningMsg: string
    infoMsg: string
}

const initialState: ToastState = {
    msg: '',
    successMsg: '',
    errorMsg: '',
    warningMsg: '',
    infoMsg: '',
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast(state, action: PayloadAction<string>) {
            state.msg = action.payload
        },
        clearMsg(state) {
            state.msg = ''
        },
        setSuccessToast(state, action: PayloadAction<string>) {
            state.successMsg = action.payload
        },
        clearSuccessMsg(state) {
            state.successMsg = ''
        },
        setErrorToast(state, action: PayloadAction<string>) {
            state.errorMsg = action.payload
        },
        clearErrorMsg(state) {
            state.errorMsg = ''
        },
        setWarningToast(state, action: PayloadAction<string>) {
            state.warningMsg = action.payload
        },
        clearWarningMsg(state) {
            state.warningMsg = ''
        },
        setInfoToast(state, action: PayloadAction<string>) {
            state.infoMsg = action.payload
        },
        clearInfoMsg(state) {
            state.infoMsg = ''
        },
    },
})

export const {
    setToast,
    clearMsg,
    setErrorToast,
    clearErrorMsg,
    setSuccessToast,
    clearSuccessMsg,
    setWarningToast,
    clearWarningMsg,
    setInfoToast,
    clearInfoMsg,
} = toastSlice.actions

export default toastSlice.reducer
