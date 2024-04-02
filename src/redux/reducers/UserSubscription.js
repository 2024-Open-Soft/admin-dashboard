import { createSlice } from "@reduxjs/toolkit";

export const userSubscription = createSlice({
  name: "usersubscription",
  initialState: {
    data: {
      id: undefined,
      user: undefined,
      subscriptions: undefined,
    },
  },
  reducers: {
    setUserSubscription: (state, action) => {
      state.data = action.payload;
      // console.log("action.payload : ", action.payload);
      // console.log("state.data : ", state.data);
    },
  },
});

export const { setUserSubscription } = userSubscription.actions;

export default userSubscription.reducer;
