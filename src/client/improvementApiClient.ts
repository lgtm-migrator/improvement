import { generatedApi } from './improvementApiClient.generated'

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['User'],
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
    },
})

export const {
    useRegisterMutation,
    useAccessTokenMutation,
    useCurrentUserQuery,
} = api
