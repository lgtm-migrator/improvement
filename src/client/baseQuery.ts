/* eslint-disable @typescript-eslint/ban-types */
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const headersConfigWithToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }

    return config
}

const authUrls = ['/api/auth/register', '/api/auth/access-token']

const getHeadersConfig = (url: string) => {
    if (authUrls.includes(url)) {
        const authConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        return authConfig
    }
    const baseConfig = headersConfigWithToken()

    return baseConfig
}

export const axiosBaseQuery: BaseQueryFn<
    {
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
    },
    unknown,
    unknown
> = async ({ url, method, data }) => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`
    const headers = getHeadersConfig(url)
    try {
        const result = await axios({
            url: baseUrl + url,
            method,
            data,
            headers,
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
