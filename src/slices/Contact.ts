import { addContact, deleteContact, fetchContacts } from "@/actions/contact";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  contacts: [],
  isLoading: false,
  error: "",
} as { contacts: any[]; isLoading: boolean; error: string };
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    // Adding
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    });

    // Deleting
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (item: any) => item.id !== action.payload
      );
    });
  },
});

export const contactReducer = contactSlice.reducer;
