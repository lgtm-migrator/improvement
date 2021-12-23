import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'state/store'

export type AppModals = '' | 'newBoard'
export type ModalAndPath = { modalPath: string; modal: AppModals }

interface ModalState {
    open: boolean
    openedModalName: AppModals | ''
    modalPath: string
}

const initialState: ModalState = {
    open: false,
    openedModalName: '',
    modalPath: '',
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<ModalAndPath>) {
            state.open = true
            state.openedModalName = action.payload.modal
            state.modalPath = action.payload.modalPath
        },
        closeModal(state) {
            state.open = false
            state.openedModalName = ''
            state.modalPath = ''
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalActions = modalSlice.actions
export default modalSlice.reducer

export const modalSelector = (state: RootState) => ({
    modalOpen: state.modal.open,
    modalName: state.modal.openedModalName,
    modalRoute: `${state.modal.modalPath}/modal/${state.modal.openedModalName}`,
})
