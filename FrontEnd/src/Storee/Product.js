import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  gender: [],
  category: [],
  sizes: [],
  brands: [],
  colors: [],
  discounts: [],
  totalProducts: 0,
};
const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
    },
    appendData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchGender: (state, action) => {
      state.gender = action.payload;
    },
    fetchCategory: (state, action) => {
      state.category = action.payload;
    },
    fetchSizes: (state, action) => {
      state.sizes = action.payload;
    },
    fetchBrands: (state, action) => {
      state.brands = action.payload;
    },
    fetchColors: (state, action) => {
      state.colors = action.payload;
    },
    fetchDiscounts: (state, action) => {
      state.discounts = action.payload;
    },
    setProductsCount: (state, action) => {
      state.totalProducts = action.payload;
    },
  },
});

export const {
  fetchData,
  setLoader,
  fetchGender,
  fetchCategory,
  fetchSizes,
  fetchBrands,
  fetchColors,
  fetchDiscounts,
  setProductsCount,
  appendData,
} = product.actions;
export default product.reducer;
