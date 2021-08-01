/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'

export const api = createApi({
    baseQuery: axiosBaseQuery,
    tagTypes: [],
    endpoints: (build) => ({
        register: build.mutation<RegisterApiResponse, RegisterApiArg>({
            query: (queryArg) => ({
                url: `/api/auth/register`,
                method: 'POST',
                body: queryArg.bodyRegisterApiAuthRegisterPost,
            }),
        }),
        accessToken: build.mutation<AccessTokenApiResponse, AccessTokenApiArg>({
            query: (queryArg) => ({
                url: `/api/auth/access-token`,
                method: 'POST',
                body: queryArg.bodyAccessTokenApiAuthAccessTokenPost,
            }),
        }),
        currentUser: build.query<CurrentUserApiResponse, CurrentUserApiArg>({
            query: () => ({ url: `/api/user/me`, method: 'GET' }),
        }),
    }),
})
export type RegisterApiResponse = /** status 200 Successful Response */ Token
export type RegisterApiArg = {
    bodyRegisterApiAuthRegisterPost: BodyRegisterApiAuthRegisterPost
}
export type AccessTokenApiResponse = /** status 200 Successful Response */ Token
export type AccessTokenApiArg = {
    bodyAccessTokenApiAuthAccessTokenPost: BodyAccessTokenApiAuthAccessTokenPost
}
export type CurrentUserApiResponse =
    /** status 200 Successful Response */ UserDbBase
export type CurrentUserApiArg = {}
export type Token = {
    accessToken: string
    tokenType: string
}
export type ValidationError = {
    loc: string[]
    msg: string
    type: string
}
export type HttpValidationError = {
    detail?: ValidationError[]
}
export type BodyRegisterApiAuthRegisterPost = {
    grant_type?: string
    username: string
    password: string
    scope?: string
    client_id?: string
    client_secret?: string
}
export type BodyAccessTokenApiAuthAccessTokenPost = {
    grant_type?: string
    username: string
    password: string
    scope?: string
    client_id?: string
    client_secret?: string
}
export type UserDbBase = {
    userUuid: string
    username: string
    email?: string
    isActive?: boolean
    createdAt: string
    updatedAt: string
}
export const {
    useRegisterMutation,
    useAccessTokenMutation,
    useCurrentUserQuery,
} = api
