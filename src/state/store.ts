import { createBrowserHistory } from 'history'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api } from 'client/improvementApiClient'

export const history = createBrowserHistory()

const routerHistoryMiddleware = routerMiddleware(history)

const middleware = [routerHistoryMiddleware, api.middleware]

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    router: connectRouter(history),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
