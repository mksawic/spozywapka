import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: null,
  products: {},
  total: 0,
};

// export const authenticate = createAsyncThunk(
//   "carts/authenticate",
//   async ({ email, password }) => {
//     await auth.signInWithEmailAndPassword(email, password);
//     console.log(auth);
//     return response;
//   }
// );

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
  // extraReducers: (builder) => {
  //   builder.addCase(authenticate.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(authenticate.fulfilled, (state, action) => {
  //     console.log(action.payload);
  //     state.loading = false;
  //   });
  //   builder.addCase(authenticate.rejected, (state, action) => {
  //     console.log(action);
  //     state.loading = false;
  //   });
  // },
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
