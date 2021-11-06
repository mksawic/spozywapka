import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../firebase/OrderService";
const initialState = {
  orders: null,
};
export const getOrdersAction = createAsyncThunk("order/get", async () => {
  return await getOrders();
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setInitial: () => initialState,
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    cancelOrder: (state, action) => {
      const { id } = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) order.status = 5;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersAction.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const { setInitial, setOrders, cancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
