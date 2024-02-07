import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  prod_data: [],
  status: "success",
};

export const fetch_product_data = createAsyncThunk("fetch_products", async () => {
  try {
    const response =await axios.get("https://dummyjson.com/products");
    return response?.data?.products;
  } catch (error) {
    console.log(error);
  }
});

export const ProductSlice = createSlice({
  name: "fetch_products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch_product_data.pending, (state) => {
      state.prod_data = null;
      state.status = "loading";
    });
    builder.addCase(fetch_product_data.fulfilled, (state, { payload }) => {
      state.prod_data = payload;
      state.status = "success";
    });
    builder.addCase(fetch_product_data.rejected, (state) => {
      state.status = "error";
    });
  },
});
