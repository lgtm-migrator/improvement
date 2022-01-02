import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { api } from 'client/api'
import boardReducer from 'state/slices/boardSlice'
import modalReducer from 'state/slices/modalSlice'
import formReducer from 'state/slices/formSlice'
import toastReducer from 'state/slices/toastSlice'

const middleware = [api.middleware]

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    board: boardReducer,
    forms: formReducer,
    modal: modalReducer,
    toast: toastReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
