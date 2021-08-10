import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}`

const headersBaseConfig = (accessToken: string | null) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (accessToken) {
        const accessConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        }

        return accessConfig
    }

    return config
}

const authUrls = ['/api/auth/register', '/api/auth/access-token']

const getHeadersConfig = (isAuthUrl: boolean, accessToken: string | null) => {
    if (isAuthUrl) {
        const authConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        return authConfig
    }
    const baseConfig = headersBaseConfig(accessToken)

    return baseConfig
}

export const axiosBaseQuery: BaseQueryFn<
    {
        url: string
        method?: AxiosRequestConfig['method']
        body?: AxiosRequestConfig['data']
    },
    unknown,
    unknown
> = async ({ url, method, body }) => {
    const accessToken = localStorage.getItem('accessToken')

    const isAuthUrl = authUrls.includes(url)
    const headers = getHeadersConfig(isAuthUrl, accessToken)
    const authBody = isAuthUrl && new FormData()

    if (authBody) {
        authBody.append('username', body.username)
        authBody.append('password', body.password)
    }

    try {
        const result = await axios({
            url: baseUrl + url,
            method,
            ...headers,
            data: authBody ?? body,
        })

        return { data: result.data }
    } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data,
            },
        }
    }
}
