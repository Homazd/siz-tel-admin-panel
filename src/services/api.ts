import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Profile {
  id: number;
  IMSI: string;
  connected: boolean;
}
interface ProfileResponse {
  profiles: Profile[];
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileResponse, void>({
      query: () => "/profiles",
    }),
    addProfile: builder.mutation({
      query: (profile) => ({
        url: "/profiles",
        method: "POST",
        body: profile,
      }),
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: `/profiles/${profile.id}`,
        method: "PATCH",
        body: profile,
      }),
    }),
    deleteProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

// Export Hooks for usage in functional components
export const {
  useGetProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = apiSlice;
