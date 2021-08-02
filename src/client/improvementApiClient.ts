import { generatedApi } from './improvementApiClient.generated'

export const api = generatedApi

export const {
    useRegisterMutation,
    useAccessTokenMutation,
    useCurrentUserQuery,
} = api
