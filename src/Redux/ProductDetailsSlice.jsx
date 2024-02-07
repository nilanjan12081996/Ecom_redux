import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  details_Data: [],
  status: "success",
};

export const fetch_product_details = createAsyncThunk(
  "fetch_details",
  async (id) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ProductDetailsSlice = createSlice({
  name: "fetch_details",
  initialState,
  reducers: {},

  extraReducers: (builders) => {
    builders.addCase(fetch_product_details.pending, (state) => {
      state.details_Data = null;
      state.status = "loading";
    });
    builders.addCase(fetch_product_details.fulfilled, (state, { payload }) => {
      state.details_Data = payload;
      state.status = "success";
    });
    builders.addCase(fetch_product_details.rejected, (state) => {
      state.status = "error";
    });
  },
});
