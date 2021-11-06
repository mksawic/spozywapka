import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: null,
  products: {},
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitial: () => initialState,
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setProducts: (state, action) => {
      action.payload.forEach((product) => {
        state.products[product.id] = { ...product, amount: 0 };
      });
    },
    addOneProduct: (state, action) => {
      const { id, price } = action.payload;
      state.products[id].amount += 1;
      state.total += price;
    },
    removeOneProduct: (state, action) => {
      const { id, price } = action.payload;
      state.products[id].amount -= 1;
      state.total -= price;
    },
    setAmount: (state, action) => {
      const { item, amount } = action.payload;
      const product = state.products[item.id];
      state.total -= product.price * product.amount;
      product.amount = amount;
      state.total += product.price * product.amount;
    },
    resetAmount: (state, action) => {
      const { id } = action.payload;
      const product = state.products[id];
      state.total -= product.price * product.amount;
      product.amount = 0;
    },
  },
});

export const {
  setInitial,
  setStore,
  setProducts,
  addOneProduct,
  removeOneProduct,
  setAmount,
  resetAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
