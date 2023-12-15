import { IContact } from "@/interfaces/contact";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contact"],
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
    getContacts: builder.query<IContact, void>({
      query: () => `/contacts`,
      providesTags: ["Contact"],
    }),
    getContactById: builder.query<IContact, number | string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (contact: IContact) => ({
        url: `/contacts`,
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    removeContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useRemoveContactMutation,
  useAddContactMutation,
} = contactApi;
export const contactReducer = contactApi.reducer;

export default contactApi;
