import { Dispatch } from 'redux'

import { AuthActionType, AuthAction } from '../../types/auth'
import { getCurrentUser } from '../../requests/user'
import { handleLogin, handleRegister } from '../../requests/auth'

export const loadUser =
    () =>
    async (dispatch: Dispatch<AuthAction>): Promise<void> => {
        dispatch({ type: AuthActionType.USER_LOADING })
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            await getCurrentUser(accessToken)
                .then((data) => {
                    dispatch({
                        type: AuthActionType.USER_LOADED,
                        payload: data,
                    })
                })
                .catch(() => {
                    // dispatch(
                    //     returnErrors(err.response.data, err.response.status)
                    // )
                    dispatch({
                        type: AuthActionType.AUTH_ERROR,
                    })
                })
        } else {
            dispatch({
                type: AuthActionType.ANON_USER,
            })
        }
    }

export const login =
    (username: string, password: string) =>
    async (dispatch: Dispatch<AuthAction>): Promise<void> => {
        await handleLogin(username, password)
            .then((data) => {
                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: { accessToken: data.access_token },
                })
            })
            .then(() => window.location.reload())
            .catch(() => {
                // dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AuthActionType.LOGIN_FAIL,
                })
            })
    }

export const register =
    (username: string, password: string) =>
    async (dispatch: Dispatch<AuthAction>): Promise<void> => {
        await handleRegister(username, password)
            .then((data) => {
                dispatch({
                    type: AuthActionType.REGISTER_SUCCESS,
                    payload: { accessToken: data.access_token },
                })
            })
            .then(() => window.location.reload())
            .catch(() => {
                // dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AuthActionType.REGISTER_FAIL,
                })
            })
    }

export const logout =
    () =>
    (dispatch: Dispatch<AuthAction>): void => {
        dispatch({
            type: AuthActionType.LOGOUT_SUCCESS,
        })
    }
