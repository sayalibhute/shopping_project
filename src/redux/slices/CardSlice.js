import {createSlice} from "@reduxjs/toolkit";
const initialState ={
    cartItems :JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const {product , qty} = action.payload;
            const existingItem = state.cartItems.find((x)=>x.id === product._id)
            if(existingItem){
                state.cartItems = state.cartItems.map((x)=>x._id === product._id ?{...x, qty} : x );

            } else {
                state.cartItems.push({...product,qty});
            }
            localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
        },
        removeFromCart:(state,action)=>{
            state.cartItems =state.cartItems.filter((x)=>x._id !== action.payload)
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        saveShippingAddress: (state,action)=>{
            state.shippingAddress =action.payload;
            localStorage.setItem('shippingAddress',JSON.stringify(state.shippingAddress));

        },
        savePaymentMethod:(state,action)=>{
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod',JSON.stringify(state.paymentMethod));
        }
    },
});

export const {addToCart,removeFromCart,saveShippingAddress,savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer;