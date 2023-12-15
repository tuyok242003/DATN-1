import { IPost } from "../interfaces/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "post",
  tagTypes: ["Post"],
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
    getPosts: builder.query<IPost, void>({
      query: () => `/posts`,
      providesTags: ["Post"],
    }),
    getPostById: builder.query<IPost, number | string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
    addPost: builder.mutation({
      query: (post: IPost) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    removePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useRemovePostMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = postApi;
export const postReducer = postApi.reducer;

export default postApi;
