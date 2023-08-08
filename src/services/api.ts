import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SubscriberType {
  id: number;
  IMSI: string;
  connected: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/dashboard/subscribers",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Subscribers"],
  endpoints: (builder) => ({
    getSubscribers: builder.query<SubscriberType, string>({
      query: (imsi) => ({
        url: `${imsi}`,
      }),

      providesTags: ["Subscribers"],
    }),
    addSubscriber: builder.mutation<SubscriberType, SubscriberType>({
      query: (IMSI) => ({
        url: "/subscribers",
        method: "POST",
        body: { IMSI },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Subscribers"],
    }),
    updateSubscriber: builder.mutation({
      query: (subscriber) => ({
        url: `/subscriber/${subscriber.IMSI}`,
        method: "PATCH",
        body: subscriber,
      }),
      invalidatesTags: ["Subscribers"],
    }),
    deleteSubscriber: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Subscribers"],
    }),
  }),
});

// Export Hooks for usage in functional components
export const {
  useGetSubscribersQuery,
  useAddSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} = apiSlice;
