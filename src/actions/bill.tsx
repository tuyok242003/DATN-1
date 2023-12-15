import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchBills = createAsyncThunk("bill/fetchBills", async () => {
  const { data } = await axios.get("http://localhost:3003/bills");
  return data;
});

export const addBill = createAsyncThunk("bill/addBill", async (bill) => {
  const { data } = await axios.post("http://localhost:3003/bills", bill);
  return data;
});
export const deleteBill = createAsyncThunk("bill/deleteBill", async (id) => {
  await axios.delete("http://localhost:3003/bill/" + id);
  return id;
});
export const updateBill = createAsyncThunk("post/updateBill", async (bill) => {
  const { data } = await axios.put(
    "http://localhost:3003/bills/" + bill.id,
    bill
  );
  return data;
});
