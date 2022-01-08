import { generatedApi } from 'client/codegen/generatedApi'

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['User', 'UserBoards'],
    endpoints: {
        currentUser: {
            providesTags: ['User'],
        },
        register: {
            invalidatesTags: ['User'],
        },
        accessToken: {
            invalidatesTags: ['User'],
        },
        listUserBoards: {
            providesTags: ['UserBoards'],
        },
        createNewBoard: {
            invalidatesTags: ['UserBoards'],
        },
        deleteUserBoard: {
            invalidatesTags: ['UserBoards'],
        },
    },
})

export const {
    useRegisterMutation,
    useAccessTokenMutation,
    useCurrentUserQuery,
    useCreateNewBoardMutation,
    useListUserBoardsQuery,
    useGetOneUserBoardQuery,
    useUpdateUserBoardMutation,
    useDeleteUserBoardMutation,
} = api

export const { resetApiState } = api.util
