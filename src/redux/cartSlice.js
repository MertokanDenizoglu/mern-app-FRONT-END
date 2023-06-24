import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartItems : [],
    total: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).total : 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    deleteAll: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    increase: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      findCartItem.quantity += 1;
      state.total += findCartItem.price;
    },
    decrease: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      findCartItem.quantity -= 1;
      if (findCartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= findCartItem.price;
    },
  },
});

export const { addProduct, deleteCart, increase, deleteAll, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
