import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppModals = 'newBoard'

interface ModalState {
    open: boolean
    openedModalName: AppModals | ''
}

const initialState = { open: false, openedModalName: '' } as ModalState

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<AppModals>) {
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
