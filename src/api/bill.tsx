import { IBill } from "../interfaces/bill";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const billApi = createApi({
  reducerPath: "bill",
  tagTypes: ["Bill"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      headers.set("authorization", `Bearer ${token}`);
      // modify header theo từng request
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBills: builder.query<IBill, void>({
      query: () => `/bills`,
      providesTags: ["Bill"],
    }),
    getBillById: builder.query<IBill, number | string>({
      query: (id) => `/bills/${id}`,
      providesTags: ["Bill"],
    }),
    addBill: builder.mutation({
      query: (bill: IBill) => ({
        url: `/bills`,
        method: "POST",
        body: bill,
      }),
      invalidatesTags: ["Bill"],
    }),
    updateBill: builder.mutation<IBill, IBill>({
      query: (bill) => ({
        url: `/bills/${bill.id}`,
        method: "PATCH",
        body: bill,
      }),
      invalidatesTags: ["Bill"],
    }),
    removeBill: builder.mutation<void, number>({
      query: (id) => ({
        url: `/bills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bill"],
    }),
  }),
});

export const {
  useGetBillsQuery,
  useGetBillByIdQuery,
  useRemoveBillMutation,
  useAddBillMutation,
  useUpdateBillMutation,
} = billApi;
export const billReducer = billApi.reducer;

export default billApi;
