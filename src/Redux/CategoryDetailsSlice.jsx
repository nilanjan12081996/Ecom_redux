import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState ={
    cat_details :[],
    status:'success'
}

export const fetch_category_details = createAsyncThunk(
    "cat_details",
    async(category)=>{
        try{
          const response = await axios.get(`https://dummyjson.com/products/category/${category}`)  
          return response?.data?.products
        }catch(error){
          console.log(error);
        }
    }
)

export const CategoryDetailsSlice = createSlice({
    name:'cat_details',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(fetch_category_details.pending,(state)=>{
            state.cat_details=null;
            state.status ='loading'  
        })
        builders.addCase(fetch_category_details.fulfilled,(state,{payload})=>{
            state.cat_details=payload;
            state.status ='success'  
        })
        builders.addCase(fetch_category_details.rejected,(state)=>{
            state.status ='error'  
        })
    }
})