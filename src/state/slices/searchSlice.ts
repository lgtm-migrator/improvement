import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SearchState = {
    input: string
}

const initialState: SearchState = { input: '' }

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.input = action.payload
        },
        clearSearch() {
            return initialState
        },
    },
})

export const { setSearch, clearSearch } = searchSlice.actions

export default searchSlice.reducer
