import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const { data } = await axios.get("http://localhost:3003/contacts");
    return data;
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (contact) => {
    const { data } = await axios.post(
      "http://localhost:3003/contacts",
      contact
    );
    return data;
  }
);
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id) => {
    await axios.delete("http://localhost:3003/contact/" + id);
    return id;
  }
);
