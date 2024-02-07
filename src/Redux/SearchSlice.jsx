import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState ={
    search_data :[],
    status:"success"
}


export const fetch_search = createAsyncThunk(
    'search',async(searchQuery)=>{
        try{
         const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`)
         return response?.data?.products
        //  console.log("Search Response:", response.data);
        }catch(error){
            console.log(error);
        }
    }
)

export const SearchSlice = createSlice({
    name:'seacrh',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(fetch_search.pending,(state)=>{
            state.search_data=[]
            state.status='loading'
        })
        builders.addCase(fetch_search.fulfilled,(state,{payload})=>{
            state.search_data=payload
            state.status='success'
        })
        builders.addCase(fetch_search.rejected,(state)=>{           
            state.status='error'
        })
    }
})