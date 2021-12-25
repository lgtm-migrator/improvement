import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'client/baseQuery'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
    baseQuery: axiosBaseQuery,
    endpoints: () => ({}),
})
