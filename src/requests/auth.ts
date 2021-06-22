/* eslint-disable camelcase */
import axios from 'axios'

type AuthResponse = {
    access_token: string
    token_type: string
    detail?: string
}

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
