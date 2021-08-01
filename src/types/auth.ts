import { User } from './user'

export type AuthState = {
    accessToken: string | null
    isAuthenticated: boolean
    status: 'idle' | 'loading' | 'success' | 'error'
    user?: User
}

export type AuthResponse = {
    accessToken: string
    tokenType: string
    detail?: string
}
