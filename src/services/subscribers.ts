import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SubscriberType {
  id: number;
  IMSI: string;
  connected: boolean;
}

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  tagTypes: ["Subscribers"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/dashboard/subscribers",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      const username = localStorage.getItem("username");
      if (token && username) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("username", username);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSubscribers: builder.query<
      SubscriberType,
      { username: string; imsi: number }
    >({
      query: ({ username, imsi }) => ({
        url: `data/${imsi}?username=${username}`,
        method: "GET",
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
} = subscriberApi;
