import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
    open: boolean
    openedModalName: string
}

const initialState = { open: false, openedModalName: '' } as ModalState

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<string>) {
            state.open = true
            state.openedModalName = action.payload
        },
        closeModal(state) {
            state.open = false
            state.openedModalName = ''
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalActions = modalSlice.actions
export default modalSlice.reducer
