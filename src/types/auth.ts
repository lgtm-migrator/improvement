import { User } from './user'

export type AuthState = {
    accessToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    user?: User
}

export type AuthResponse = {
    /* eslint-disable */
    accessToken: string
    tokenType: string
    /* eslint-enable */
    detail?: string
}

// REDUX AUTH ACTION TYPES

export enum AuthActionType {
    USER_LOADED = 'USER_LOADED',
    USER_LOADING = 'USER_LOADING',
    AUTH_ERROR = 'AUTH_ERROR',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',
    ANON_USER = 'ANON_USER',
}

export interface NoPayloadAuthAction {
    type:
        | AuthActionType.USER_LOADING
        | AuthActionType.AUTH_ERROR
        | AuthActionType.LOGIN_FAIL
        | AuthActionType.LOGOUT_SUCCESS
        | AuthActionType.REGISTER_FAIL
        | AuthActionType.ANON_USER
}

export interface UserLoadedAction {
    type: AuthActionType.USER_LOADED
    payload: User
}

export interface LoginOrRegisterAction {
    type: AuthActionType.LOGIN_SUCCESS | AuthActionType.REGISTER_SUCCESS
    payload: { accessToken: string }
}

export type AuthAction =
    | UserLoadedAction
    | LoginOrRegisterAction
    | NoPayloadAuthAction
