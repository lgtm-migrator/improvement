import axios from 'axios'

import { User } from '../types/user'
import { headersConfigWithToken } from '../utils/auth'

export const getCurrentUser = async (accessToken: string): Promise<User> => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/me`,
        headersConfigWithToken(accessToken)
    )

    return res.data
}
