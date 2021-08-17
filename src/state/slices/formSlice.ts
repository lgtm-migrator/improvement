import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardCreate } from 'client/improvementApiClient.generated'

type FormState = {
    newBoard: BoardCreate
}

const initialState: FormState = {
    newBoard: { boardName: '', ownerUuid: '' },
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setNewBoardForm(state, action: PayloadAction<BoardCreate>) {
            state.newBoard = action.payload
        },
        resetNewBoardForm(state) {
            state.newBoard = initialState.newBoard
        },
    },
})

export const { setNewBoardForm, resetNewBoardForm } = formSlice.actions
export const formActions = formSlice.actions
export default formSlice.reducer
