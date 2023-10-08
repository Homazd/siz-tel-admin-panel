import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataType } from "@/redux/Types/subscriberTypes";

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  tagTypes: ['DataType'],
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
    getSubscribers: builder.query<DataType, string>({
      query: (imsi: string) => ({
        url: `/mon/${imsi}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'DataType', id}]
    }),
    addSubscriber: builder.mutation<DataType, Partial<DataType>>({
      query: (data: DataType) => ({
        url: "/mon/",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result) => [{ type: 'DataType', id: result?.imsi}],
    }),
    //

    updateSubscriber: builder.mutation<
      DataType,
      Partial<DataType> & Pick<DataType, "imsi">
    >({
      query: (data: DataType) => ({
        url: `/mon/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          imsi: data.imsi,
        },
        body: data,
      }),
      invalidatesTags: (result, error, {imsi}) => [{ type: 'subscriber', imsi}],
    }),
    deleteSubscriber: builder.mutation({
      query: (imsi: string) => ({
        url: `/mon/${imsi}`,
        method: "DELETE",
      }),
      invalidatesTags: ['DataType'],
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
