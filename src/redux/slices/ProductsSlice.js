import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("Product/fetchAll",async()=>{
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    console.error("API Error:", error.response?.status, error.response?.data);
    throw error; // Make sure to rethrow so rejected case still runs
  }


})
const productSlice = createSlice({
    name:"Product",
    initialState:{
        products : [],
        loading : false,
        error: null,
    },
    extraReducers :(builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled,(state,action) =>{
            state.loading = false;
            state.products = action.payload;// all the information for products :-payload retrived
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export default productSlice.reducer;