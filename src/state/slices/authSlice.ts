import { createSlice } from '@reduxjs/toolkit'
import { api } from 'client/api'
import { Token } from 'client/codegen/generatedApi'
import { RootState } from 'state/store'

export type AuthState = {
    tokenData: Token
}

const initialState: AuthState = {
    tokenData: {
        accessToken: localStorage.getItem('accessToken') ?? '',
        tokenType: localStorage.getItem('tokenType') ?? '',
    },
}

const setTokenDataToLocalStorage = (accessToken: string, tokenType: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('tokenType', tokenType)
}

const emptyTokenData = { accessToken: '', tokenType: '' }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.tokenData = emptyTokenData
            setTokenDataToLocalStorage('', '')
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.accessToken.matchFulfilled,
            (state, { payload }) => {
                state.tokenData = payload
                setTokenDataToLocalStorage(
                    payload.accessToken,
                    payload.tokenType
                )
            }
        ),
            builder.addMatcher(
                api.endpoints.accessToken.matchRejected,
                (state) => {
                    state.tokenData = emptyTokenData
                    setTokenDataToLocalStorage('', '')
                }
            ),
            builder.addMatcher(
                api.endpoints.register.matchFulfilled,
                (state, { payload }) => {
                    state.tokenData = payload
                    setTokenDataToLocalStorage(
                        payload.accessToken,
                        payload.tokenType
                    )
                }
            ),
            builder.addMatcher(
                api.endpoints.register.matchRejected,
                (state) => {
                    state.tokenData = emptyTokenData
                    setTokenDataToLocalStorage('', '')
                }
            )
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

export const authTokenSelector = (state: RootState) =>
    state.auth.tokenData.accessToken
