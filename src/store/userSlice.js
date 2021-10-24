import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../config/firebase";

const auth = Firebase.auth();
const initialState = {
  id: null,
  email: "",
  payments: [],
  loading: false,
};

export const authenticate = createAsyncThunk(
  "users/authenticate",
  async ({ email, password }) => {
    await auth.signInWithEmailAndPassword(email, password);
    console.log(auth);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
