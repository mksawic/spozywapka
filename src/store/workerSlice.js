import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, getOrdersByStore } from "../firebase/OrderService";
import { getProducts } from "../firebase/ProductService";
import { getStore } from "../firebase/StoreService";
const initialState = {
  store: null,
  products: null,
  orders: null,
  status: "init",
};

export const getWorkerData = createAsyncThunk("worker/get", async (storeId) => {
  const promises = [
    getStore(storeId),
    getProducts(storeId),
    getOrdersByStore(storeId),
  ];
  return await Promise.all(promises);
});

export const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setInitial: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkerData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getWorkerData.fulfilled, (state, action) => {
      const [store, orders, products] = action.payload;
      state.store = store;
      state.orders = orders;
      state.products = products;
      state.status = "success";
    });
    builder.addCase(getWorkerData.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setInitial } = workerSlice.actions;

export default workerSlice.reducer;
