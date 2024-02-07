import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  catg_data: [],
  status: "success",
};

export const fetch_category_data = createAsyncThunk("fetch_categories", async () => {
  try {
    const response =await axios.get("https://dummyjson.com/products/categories");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});

export const CategorySlice = createSlice({
  name: "fetch_categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch_category_data.pending, (state) => {
      state.catg_data = null;
      state.status = "loading";
    });
    builder.addCase(fetch_category_data.fulfilled, (state, { payload }) => {
      state.catg_data = payload;
      state.status = "success";
    });
    builder.addCase(fetch_category_data.rejected, (state) => {
      state.status = "error";
    });
  },
});
