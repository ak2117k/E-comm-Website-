import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import CartSlice from "./CartSlice.js";
import Data from "./Data.js";
import Wishlist from "./WishlistSlice.js";
import Location from "./Location.js";
import Product from "./Product.js";
import User from "./User.js";
import SingleProduct from "./SingleProduct.js";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // The key in the storage
  storage, // The storage to use (localStorage by default)
  whitelist: ["user"], // The slices you want to persist
};

const persistedUserReducer = persistReducer(persistConfig, User);

const store = configureStore({
  reducer: {
    cart: CartSlice,
    data: Data,
    wishlist: Wishlist,
    location: Location,
    product: Product,
    user: persistedUserReducer,
    singleProduct: SingleProduct,
  },
});
const persistor = persistStore(store);

export { store, persistor };
