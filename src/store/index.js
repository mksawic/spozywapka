import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import storeReducer from "./storeSlice";
import workerReducer from "./workerSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    stores: storeReducer,
    worker: workerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
