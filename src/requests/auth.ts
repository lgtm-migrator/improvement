import axios, { AxiosResponse } from 'axios'

export const handleRegister = async (
    username: string,
    password: string
): Promise<AxiosResponse> => {
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
