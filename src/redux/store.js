import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User";
import countryReducer from "./reducers/CountryReducer";
import userSubscription from "./reducers/UserSubscription";

const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
    usersubscription: userSubscription,
  },
});

export default store;
