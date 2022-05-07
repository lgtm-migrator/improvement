import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { isObjectWithUnknownProperties } from 'utils/validation'

export type BaseQueryError = {
    status: number | undefined
    msg: string
}

export type HeadersConf = { [key: string]: string }

type BaseQueryArgs = {
    baseUrl: string
    prepareHeaders: (
        url: string,
        getState: () => unknown
    ) => { isAuth: boolean; headers: HeadersConf }
}

type BaseQueryFunction = BaseQueryFn<
    {
        url: string
        method?: AxiosRequestConfig['method']
        body?: AxiosRequestConfig['data']
    },
    unknown,
    unknown
>

export const axiosBaseQuery =
    ({ baseUrl, prepareHeaders }: BaseQueryArgs): BaseQueryFunction =>
    async ({ url, method, body }, { getState }) => {
        const { isAuth, headers } = prepareHeaders(url, getState)
        const authBody = isAuth && new FormData()

        if (authBody) {
            authBody.append('username', body.username)
            authBody.append('password', body.password)
        }

        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                headers,
                data: !authBody ? body : authBody,
            })

            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError as AxiosError
            const data = err.response?.data
            const errMsg =
                isObjectWithUnknownProperties(data) && 'detail' in data
                    ? String(data.detail)
                    : ''
            const errorObj = {
                error: {
                    status: err.response?.status,
                    msg: errMsg,
                },
            }
            return errorObj
        }
    }
