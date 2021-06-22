import { selector } from 'recoil'
import axios from 'axios'

import { headersConfigWithToken } from '../utils/auth'

export const loadUserProfile = selector({
    key: 'loadUserProfile',
    get: async () => {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            // If there's a token
            // try fetching user profile by using it
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/user/me`,
                    headersConfigWithToken(accessToken)
                )
                const isAuthenticated = true
                const user = res.data

                return {
                    isAuthenticated,
                    user,
                }
            } catch (err) {
                localStorage.removeItem('accessToken')
                const isAuthenticated = false
                return {
                    isAuthenticated,
                    err,
                }
            }
        } else {
            // If no token, return this by default
            const isAuthenticated = false
            return {
                isAuthenticated,
            }
        }
    },
})
