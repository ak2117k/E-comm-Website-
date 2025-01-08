import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import Data from "./Data.js";
import Wishlist from "./WishlistSlice.js";
import Location from "./Location.js";
import Product from "./Product.js";
import User from "./User.js";
import SingleProduct from "./SingleProduct.js";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    data: Data,
    wishlist: Wishlist,
    location: Location,
    product: Product,
    user: User,
    singleProduct: SingleProduct,
  },
});
export default store;
