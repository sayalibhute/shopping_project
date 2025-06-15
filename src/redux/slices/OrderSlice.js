import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateOrder = createAsyncThunk(
    'order/createOrder',
    async(orderData,{rejectWithValue})=>{
        try {
            const response = await axios.post('/api/order',orderData);
            return response.data;
        } catch (error) {
           return rejectWithValue(error.response.data.message || error.message); 
        }
    }

);
const orderSlice =createSlice({
    name:'order',
    initialState:{
        order:null,
        loading:false,
        error:null,
        success:false,
    },
    reducers:{
        clearOrder:(state)=>{
            state.order=null;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(CreateOrder.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;

        })
          .addCase(CreateOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.order=action.payload;


        })
         .addCase(CreateOrder.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;           

        })
    }
});
export const {clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
