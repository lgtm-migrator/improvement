import axios from 'axios'

import { AuthResponse } from '../types/auth'

const authConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}

export const handleRegister = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)

    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        body,
        authConfig
    )
    return res.data
}

export const handleLogin = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)

    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/access-token`,
        body,
        authConfig
    )
    return res.data
}
