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
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Profiles"],
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileResponse, void>({
      query: () => "/profiles",
      providesTags: ["Profiles"],
    }),
    addProfile: builder.mutation<Profile, Profile>({
      query: (IMSI) => ({
        url: "/profiles",
        method: "POST",
        body: { IMSI },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Profiles"],
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: `/profiles/${profile.id}`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: ["Profiles"],
    }),
    deleteProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Profiles"],
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
