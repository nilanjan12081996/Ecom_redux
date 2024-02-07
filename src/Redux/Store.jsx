import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./ProductSlice";
import { CategorySlice } from "./CategorySlice";
import { ProductDetailsSlice } from "./ProductDetailsSlice";
import { CategoryDetailsSlice } from "./CategoryDetailsSlice";
import { SearchSlice } from "./SearchSlice";
import { CartSlice } from "./CartSlice";



export const Store = configureStore({
    reducer:{
        product:ProductSlice.reducer,
        catgeories:CategorySlice.reducer,
        productdetails:ProductDetailsSlice.reducer,
        categorydetails:CategoryDetailsSlice.reducer,
        search:SearchSlice.reducer,
        cart:CartSlice.reducer

    }
})