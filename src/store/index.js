import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import storeReducer from "./storeSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    stores: storeReducer,
  },
});

export default store;
