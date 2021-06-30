import { AuthAction, AuthActionType, AuthState } from '../../types/auth'

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case AuthActionType.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }
        case AuthActionType.LOGIN_SUCCESS:
        case AuthActionType.REGISTER_SUCCESS:
            localStorage.setItem('accessToken', action.payload.accessToken)
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isAuthenticated: true,
                isLoading: false,
            }
        case AuthActionType.AUTH_ERROR:
        case AuthActionType.LOGIN_FAIL:
        case AuthActionType.LOGOUT_SUCCESS:
        case AuthActionType.REGISTER_FAIL:
            localStorage.removeItem('accessToken')
            return {
                ...state,
                accessToken: null,
                user: undefined,
                isAuthenticated: false,
                isLoading: false,
            }
        case AuthActionType.ANON_USER:
            return {
                ...state,
                accessToken: null,
                user: undefined,
                isAuthenticated: false,
                isLoading: false,
            }
        default:
            return state
    }
}

export default authReducer
