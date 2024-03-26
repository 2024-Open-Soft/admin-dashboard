import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User";
import countryReducer from "./reducers/CountryReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
  },
});

export default store;
