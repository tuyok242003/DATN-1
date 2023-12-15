import { addUser, deleteUser, fetchUsers, updateUser } from "../actions/user";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  isLoading: false,
  error: "",
} as { users: any[]; isLoading: boolean; error: string };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // Adding
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    // Updating;
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const newUser = action.payload;
      state.users = state.users.map((item: any) =>
        item.id == newUser.id ? newUser : item
      );
    });
    // Deleting
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (item: any) => item.id !== action.payload
      );
    });
  },
});

export const userReducer = userSlice.reducer;
