import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestoreMessage } from "../firebase/codes";
import { getAllStores } from "../firebase/StoreService";

const initialState = {
  data: null,
  refreshing: false,
  error: null,
};
export const getStoresAction = createAsyncThunk("store/get", async () => {
  return await getAllStores();
});

export const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setInitial: () => initialState,
    setStores: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStoresAction.pending, (state) => {
      state.refreshing = true;
    });
    builder.addCase(getStoresAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.refreshing = false;
    });
    builder.addCase(getStoresAction.rejected, (state, action) => {
      state.data = [];
      state.error = getFirestoreMessage(action.payload);
      state.refreshing = false;
    });
  },
});

export const { setInitial, setStores } = storeSlice.actions;

export default storeSlice.reducer;
