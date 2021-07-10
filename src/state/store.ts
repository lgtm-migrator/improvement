import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './reducers/index'

const initialState = {}

export const history = createBrowserHistory()

const routerHistoryMiddleware = routerMiddleware(history)

const middleware = [thunk, routerHistoryMiddleware]

const store = createStore(
    createRootReducer(history),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState as any,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
