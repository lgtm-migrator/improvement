/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'

export const generatedApi = createApi({
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
            query: () => ({ url: `/api/user/me` }),
        }),
        createNewBoard: build.mutation<
            CreateNewBoardApiResponse,
            CreateNewBoardApiArg
        >({
            query: (queryArg) => ({
                url: `/api/board/create`,
                method: 'POST',
                body: queryArg.boardCreate,
            }),
        }),
        listUserBoards: build.query<
            ListUserBoardsApiResponse,
            ListUserBoardsApiArg
        >({
            query: () => ({ url: `/api/board/list` }),
        }),
        getOneUserBoard: build.query<
            GetOneUserBoardApiResponse,
            GetOneUserBoardApiArg
        >({
            query: (queryArg) => ({
                url: `/api/board/list/${queryArg.boardUuid}`,
            }),
        }),
        updateUserBoard: build.mutation<
            UpdateUserBoardApiResponse,
            UpdateUserBoardApiArg
        >({
            query: (queryArg) => ({
                url: `/api/board/update`,
                method: 'PUT',
                body: queryArg.board,
            }),
        }),
        deleteUserBoard: build.mutation<
            DeleteUserBoardApiResponse,
            DeleteUserBoardApiArg
        >({
            query: (queryArg) => ({
                url: `/api/board/delete/${queryArg.boardUuid}`,
                method: 'DELETE',
            }),
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
export type CurrentUserApiResponse = /** status 200 Successful Response */ User
export type CurrentUserApiArg = {}
export type CreateNewBoardApiResponse =
    /** status 200 Successful Response */ Board
export type CreateNewBoardApiArg = {
    boardCreate: BoardCreate
}
export type ListUserBoardsApiResponse =
    /** status 200 Successful Response */ Board[]
export type ListUserBoardsApiArg = {}
export type GetOneUserBoardApiResponse =
    /** status 200 Successful Response */ Board
export type GetOneUserBoardApiArg = {
    boardUuid: string
}
export type UpdateUserBoardApiResponse =
    /** status 200 Successful Response */ Board
export type UpdateUserBoardApiArg = {
    board: Board
}
export type DeleteUserBoardApiResponse =
    /** status 200 Successful Response */ any
export type DeleteUserBoardApiArg = {
    boardUuid: string
}
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
export type User = {
    userUuid: string
    username: string
    email?: string
    isActive?: boolean
    createdAt: string
    updatedAt: string
}
export type Board = {
    boardUuid: string
    boardName: string
    columnOrder?: string[]
    ownerUuid: string
}
export type BoardCreate = {
    boardName: string
    ownerUuid: string
}
export const {
    useRegisterMutation,
    useAccessTokenMutation,
    useCurrentUserQuery,
    useCreateNewBoardMutation,
    useListUserBoardsQuery,
    useGetOneUserBoardQuery,
    useUpdateUserBoardMutation,
    useDeleteUserBoardMutation,
} = generatedApi
