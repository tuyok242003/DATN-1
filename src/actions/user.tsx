import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const { data } = await axios.get("http://localhost:3003/users");
  return data;
});

export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const { data } = await axios.post("http://localhost:3003/users", user);
  return data;
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete("http://localhost:3003/user/" + id);
  return id;
});
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const { data } = await axios.put(
    "http://localhost:3003/users/" + user.id,
    user
  );
  return data;
});
