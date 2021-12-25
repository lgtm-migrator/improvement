import { generatedApi } from 'client/codegen/generatedApi'

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['User', 'UserBoards'],
    endpoints: {
        currentUser: {
            providesTags: ['User'],
        },
        accessToken: {
            transformResponse: (response) => {
                // TODO: Fix this / improve basequery types
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { accessToken } = response as any

                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken)
                }

                return accessToken
            },
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
