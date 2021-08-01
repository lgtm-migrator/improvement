import { createBrowserHistory } from 'history'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api as generatedApi } from '../client/generatedApiClient'

export const history = createBrowserHistory()

const routerHistoryMiddleware = routerMiddleware(history)

const middleware = [routerHistoryMiddleware, generatedApi.middleware]

const rootReducer = combineReducers({
    [generatedApi.reducerPath]: generatedApi.reducer,
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
