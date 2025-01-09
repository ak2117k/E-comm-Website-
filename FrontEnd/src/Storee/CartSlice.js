import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
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
  },
});
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
