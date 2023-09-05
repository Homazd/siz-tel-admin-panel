import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FormState,
  DataType,
} from "@/redux/features/subscribers/subscriberSlice";

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  tagTypes: ["Subscribers"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.203:8008",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      // const username = localStorage.getItem("username");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: (imsi) => ({
        url: `/mon/${imsi}`,
        method: "GET",
      }),

      providesTags: ["Subscribers"],
    }),
    addSubscriber: builder.mutation<FormState, FormState>({
      query: (newSubscriber) => ({
        url: "/mon/",
        method: "POST",
        body: newSubscriber,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Subscribers"],
    }),
    //

    updateSubscriber: builder.mutation<
      DataType, Partial<DataType>>({
      query: (data) => ({
        url: `/subscriber/${data.imsi}`,
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          imsi: data.imsi,
        },
        body: data,
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
