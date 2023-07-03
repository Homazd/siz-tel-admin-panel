import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { profile } from '../redux/Types/ProfileTypes'

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://profiles.co/api/v2/'}),
    endpoints: (builder) => ({
        getProfilesByName: builder.query<profile, string>({
            query: (name) => `profile/${name}`,
        }),
    }),
})

export const { useGetProfileByNameQuery } = profileApi

