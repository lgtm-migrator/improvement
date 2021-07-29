import { createBrowserHistory } from 'history'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import auth from './reducers/auth'

export const history = createBrowserHistory()

const routerHistoryMiddleware = routerMiddleware(history)

const middleware = [routerHistoryMiddleware]

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
