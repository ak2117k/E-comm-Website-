import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleProduct: null,
};

const singleProduct = createSlice({
  name: "singlePrd",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { addProduct } = singleProduct.actions;
export default singleProduct.reducer;
