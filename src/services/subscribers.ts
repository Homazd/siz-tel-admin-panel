import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataType } from "@/redux/Types/subscriberTypes";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  tagTypes: ["Subscriber"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
    getSubscribers: builder.query<DataType, string>({
      query: (imsi: string) => ({
        url: `/mon/${imsi}`,
        method: "GET",
      }),
      providesTags: (result, error, imsi) => [{ type: "Subscriber", imsi }],
    }),
    addSubscriber: builder.mutation<DataType, Partial<DataType>>({
      query: (Subscriber) => ({
        url: "/mon/",
        method: "POST",
        body: Subscriber,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (Subscriber, error, data) => [
        { type: "Subscriber", imsi: Subscriber.imsi },
      ],
    }),
    //

    updateSubscriber: builder.mutation<DataType, Partial<DataType>>({
      query: (data: DataType) => ({
        url: `/mon/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          imsi: data.imsi,
        },
        body: data,
      }),
      invalidatesTags: (data) => [{ type: "Subscriber", data }],
    }),
    deleteSubscriber: builder.mutation({
      query: (imsi: string) => ({
        url: `/mon/${imsi}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),
  }),
});

// Export Hooks for usage in functional components
export const {
  useGetSubscribersQuery,
  useAddSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
  useLazyGetSubscribersQuery,
} = subscriberApi;
