import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState as any,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
