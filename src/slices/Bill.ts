import { addBill, deleteBill, fetchBills, updateBill } from "../actions/bill";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bills: [],
  isLoading: false,
  error: "",
} as { bills: any[]; isLoading: boolean; error: string };
const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchBills.fulfilled, (state, action) => {
      state.bills = action.payload;
    });
    // Adding
    builder.addCase(addBill.fulfilled, (state, action) => {
      state.bills.push(action.payload);
    });
    // Updating;
    builder.addCase(updateBill.fulfilled, (state, action) => {
      const newBill = action.payload;
      state.bills = state.bills.map((item: any) =>
        item.id == newBill.id ? newBill : item
      );
    });
    // Deleting
    builder.addCase(deleteBill.fulfilled, (state, action) => {
      state.bills = state.bills.filter(
        (item: any) => item.id !== action.payload
      );
    });
  },
});

export const billReducer = billSlice.reducer;
