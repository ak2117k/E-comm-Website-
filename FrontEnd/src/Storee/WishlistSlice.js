import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtoWishlist: (state, action) => {
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.wishlistItems = [...state.wishlistItems, ...itemsToAdd];
    },
    removefromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state, action) => {
      state.wishlistItems = [];
    },
  },
});

export const { addtoWishlist, removefromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
