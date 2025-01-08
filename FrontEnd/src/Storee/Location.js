import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    updatelocation: (action) => {
      return action.payload;
    },
  },
});

export const { updatelocation } = location.actions;
export default location.reducer;
