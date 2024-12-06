import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import Data from "./Data.js";
import Wishlist from "./WishlistSlice.js";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    data: Data,
    wishlist: Wishlist,
  },
});
export default store;
