import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  updatedCart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.cart.push(action.payload);
    },
    remove: (state, action) => {
      return state.cart.filter((item) => item.id !== action.payload);
    },
    Updatecart: (state, action) => {
      state.updatedCart.push(action.payload);
    },
  },
});
export const { add, remove, Updatecart } = cartSlice.actions;
export default cartSlice.reducer;
