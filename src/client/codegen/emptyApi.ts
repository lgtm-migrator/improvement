import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, HeadersConf } from 'client/baseQuery'
import { RootState } from 'src/state/store'

const baseUrl = `${import.meta.env.SNOWPACK_PUBLIC_APP_API_URL}`

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl,
        prepareHeaders: (url, getState) => {
            const token = (getState() as RootState).auth.tokenData.accessToken
            const isAuth = [
                '/api/auth/register',
                '/api/auth/access-token',
            ].includes(url)
            const headers: HeadersConf = {
                'Content-Type': isAuth
                    ? 'multipart/form-data'
                    : 'application/json',
            }

            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }

            return { isAuth, headers }
        },
    }),
    endpoints: () => ({}),
})
