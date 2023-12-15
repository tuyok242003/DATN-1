import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await axios.get("http://localhost:3003/posts");
  return data;
});

export const addPost = createAsyncThunk("post/addPost", async (post) => {
  const { data } = await axios.post("http://localhost:3003/posts", post);
  return data;
});
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  await axios.delete("http://localhost:3003/post/" + id);
  return id;
});
export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  const { data } = await axios.put(
    "http://localhost:3003/posts/" + post.id,
    post
  );
  return data;
});
