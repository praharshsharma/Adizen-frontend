import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  cartCount: localStorage.getItem("cartcnt"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
      state.currentUser = action.payload;
      window.location.reload();
    },
    authstore: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    increasecart: (state) => {
      state.cartCount++;
      console.log(state.cartCount);
    },
    logout: (state) => {
      localStorage.setItem("user", null);
      localStorage.removeItem("auth");
      window.location.href = "/auth";
    },
  },
});

export const { authSuccess, increasecart, logout, authstore } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
