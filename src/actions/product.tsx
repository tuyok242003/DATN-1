import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get("http://localhost:3003/products");
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const { data } = await axios.post(
      "http://localhost:3003/products",
      product
    );
    return data;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete("http://localhost:3003/product/" + id);
    return id;
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const { data } = await axios.put(
      "http://localhost:3003/products/" + product,
      product
    );
    return data;
  }
);
