import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { handleLogin, handleRegister } from '../../requests/auth'
import { getCurrentUser } from '../../requests/user'

import { AuthResponse, AuthState } from '../../types/auth'

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    status: 'idle',
    user: undefined,
}

type Credentials = {
    username: string
    password: string
}

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        const response = await getCurrentUser(accessToken)
        return response
    }

    return undefined
})

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: Credentials) => {
        const response = await handleLogin(username, password)
        return response
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, password }: Credentials) => {
        const response = await handleRegister(username, password)
        return response
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            localStorage.removeItem('accessToken')
            return initialState
        },
    },
    extraReducers: (builder) => {
        function pendingReducer(state: AuthState) {
            state.status = 'loading'
        }

        function rejectedReducer(state: AuthState) {
            localStorage.removeItem('accesstoken')
            state.status = 'error'
            state.isAuthenticated = false
            state.user = undefined
        }

        function loginAndRegisterReducer(
            state: AuthState,
            action: PayloadAction<AuthResponse>
        ) {
            localStorage.setItem('accessToken', action.payload.accessToken)
            state.accessToken = action.payload.accessToken
            state.status = 'success'
            state.isAuthenticated = true

            window.location.reload()
        }

        builder
            .addCase(loadUser.pending, pendingReducer)
            .addCase(login.pending, pendingReducer)
            .addCase(register.pending, pendingReducer)

        builder
            .addCase(loadUser.rejected, rejectedReducer)
            .addCase(login.rejected, rejectedReducer)
            .addCase(register.rejected, rejectedReducer)

        // eslint-disable-next-line consistent-return
        builder.addCase(loadUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = 'success'
                state.isAuthenticated = true
                state.user = action.payload
            } else if (!action.payload) {
                return initialState
            }
        })

        builder
            .addCase(login.fulfilled, loginAndRegisterReducer)
            .addCase(register.fulfilled, loginAndRegisterReducer)
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
