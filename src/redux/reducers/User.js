import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      console.log("action.payload : ", action.payload);
      // console.log("state.data : ", state.data);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
