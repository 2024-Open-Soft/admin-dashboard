import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: { data: [{ title: "loading..." }] },
  reducers: {
    setCountries: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;

export default countrySlice.reducer;
