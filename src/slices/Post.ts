import { addPost, deletePost, fetchPosts, updatePost } from "@/actions/post";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  isLoading: false,
  error: "",
} as { posts: any[]; isLoading: boolean; error: string };
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    // Adding
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    // Updating
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const newPost = action.payload;
      state.posts = state.posts.map((item: any) =>
        item.id == newPost.id ? newPost : item
      );
    });
    // Deleting
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (item: any) => item.id !== action.payload
      );
    });
  },
});

export const postReducer = postSlice.reducer;
