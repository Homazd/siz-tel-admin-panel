import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => "/profiles",
      transformResponse: (res: any) => res.reverse(),
      providesTags: ["Profile"],
    }),
    addProfile: builder.mutation({
      query: (profile) => ({
        url: "/profiles",
        method: "POST",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: `/profiles/${profile.id}`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = apiSlice;
