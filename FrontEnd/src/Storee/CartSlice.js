import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.cart = [...state.cart, ...itemsToAdd];
    },
    remove: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload // Use _id for product comparison
      );
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});
export const { add, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
