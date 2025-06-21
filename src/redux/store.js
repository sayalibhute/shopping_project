import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductsSlice";
import cartReducer from "./slices/CardSlice";
import orderReducer from "./slices/OrderSlice";
import authReducer from "./slices/AuthSlice";
// import userReducer from "./slices/NoteUserSlice";
import noteReducer from "./slices/Userslice";

const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    //users: userReducer,
    notes: noteReducer,
  },
});

export default store;
