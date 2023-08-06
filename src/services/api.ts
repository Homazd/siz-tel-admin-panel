import { Subscribers } from "@reduxjs/toolkit/dist/query/core/apiState";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Subscriber {
  id: number;
  IMSI: string;
  connected: boolean;
}
interface SubscriberResponse {
  subscribers: Subscriber[];
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Subscribers"],
  endpoints: (builder) => ({
    getSubscribers: builder.query<SubscriberResponse, string>({
      query: (IMSI) => ({
        url: "subscribers",
        params: { IMSI },
      }),
      transformResponse: (response: { data: SubscriberResponse}, meta, arg) => response.data,
      transformErrorResponse: {
        response: { status: string | number},
        meta,
        arg
      } => Response.status,

      providesTags: ["Subscribers"],
    }),
    addSubscriber: builder.mutation<Subscriber, Subscriber>({
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
