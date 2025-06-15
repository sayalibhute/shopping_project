import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductsSlice";
import cartReducer from "./slices/CardSlice";
import orderReducer from "./slices/OrderSlice";
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
