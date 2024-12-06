import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtoWishlist: (state, action) => {
      state.push(action.payload);
    },
    removefromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addtoWishlist, removefromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
