/* eslint-disable camelcase */
import axios from 'axios'

type SignupResponse = {
    access_token: string
    token_type: string
    detail?: string
}

export const handleRegister = async (
    username: string,
    password: string
): Promise<SignupResponse> => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    const body = new FormData()
    body.append('username', username)
    body.append('password', password)

    const res = await axios.post(
        'http://localhost:8000/api/auth/register',
        body,
        config
    )
    return res.data
}
