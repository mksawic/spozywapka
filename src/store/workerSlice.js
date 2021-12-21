import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestoreMessage } from "../firebase/codes";
import { getOrdersByStore, updateOrder } from "../firebase/OrderService";
import { getProducts } from "../firebase/ProductService";
import { getStore } from "../firebase/StoreService";
const initialState = {
  store: [],
  products: [],
  orders: [],
  refreshing: false,
  error: null,
};

export const getWorkerData = createAsyncThunk("worker/get", async (storeId) => {
  const promises = [
    getStore(storeId),
    getProducts(storeId),
    getOrdersByStore(storeId),
  ];
  return await Promise.all(promises);
});

export const getWorkerProducts = createAsyncThunk(
  "worker/getProducts",
  async (_, { getState }) => {
    return await getProducts(getState().worker.store.id);
  }
);

export const getOrdersByStoreAction = createAsyncThunk(
  "worker/getOrders",
  async (_, { getState }) => {
    return await getOrdersByStore(getState().worker.store.id);
  }
);

export const updateOrderAction = createAsyncThunk(
  "worker/updateOrder",
  async (order, { fulfillWithValue, rejectWithValue }) => {
    try {
      await updateOrder(order);
      return order;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setInitial: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkerData.pending, (state) => {
      state.refreshing = true;
      state.error = null;
    });
    builder.addCase(getWorkerData.fulfilled, (state, action) => {
      const [store, products, orders] = action.payload;
      state.store = store;
      state.products = products;
      state.orders = orders;
      state.refreshing = false;
    });
    builder.addCase(getWorkerData.rejected, (state, action) => {
      state.refreshing = false;
      state.error = getFirestoreMessage(action.payload);
    });

    builder.addCase(getOrdersByStoreAction.pending, (state) => {
      state.refreshing = true;
      state.error = null;
    });
    builder.addCase(getOrdersByStoreAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.refreshing = false;
    });
    builder.addCase(getOrdersByStoreAction.rejected, (state, action) => {
      state.refreshing = false;
      state.error = getFirestoreMessage(action.payload);
    });

    builder.addCase(updateOrderAction.pending, (state) => {
      state.refreshing = true;
      state.error = null;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      const order = action.payload;
      const index = state.orders.map((o) => o.id).indexOf(order.id);
      state.orders[index] = order;
      state.refreshing = false;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.refreshing = false;
      state.error = getFirestoreMessage(action.payload);
    });
    builder.addCase(getWorkerProducts.pending, (state) => {
      state.refreshing = true;
      state.error = null;
    });
    builder.addCase(getWorkerProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.refreshing = false;
    });
    builder.addCase(getWorkerProducts.rejected, (state, action) => {
      state.refreshing = false;
      state.error = getFirestoreMessage(action.payload);
    });
  },
});

export const { setInitial } = workerSlice.actions;

export default workerSlice.reducer;
