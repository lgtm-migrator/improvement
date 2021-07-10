import { combineReducers, Reducer } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'

import auth from './auth'
import { AuthState } from '../../types/auth'

export interface State {
    router: RouterState
    auth: AuthState
}

const createRootReducer = (history: History): Reducer<State> =>
    combineReducers({
        router: connectRouter(history),
        auth,
    })

export default createRootReducer
