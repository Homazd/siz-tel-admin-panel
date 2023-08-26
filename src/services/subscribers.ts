import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SubscriberType {
  imsi: string;
  descreption?: string;
}

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  tagTypes: ["Subscribers"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.205:8000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      // const username = localStorage.getItem("username");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // headers.set("username", username);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSubscribers: builder.query<SubscriberType, { imsi: string }>({
      query: ({ imsi }) => ({
        url: `/mon/${imsi}`,
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
    //

    updateSubscriber: builder.mutation<
      SubscriberType,
      Pick<SubscriberType, "imsi"> & Partial<SubscriberType>
    >({
      query: ({ imsi, ...patch }) => ({
        url: `/subscriber/${imsi}`,
        method: "PATCH",
        body: patch,
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
