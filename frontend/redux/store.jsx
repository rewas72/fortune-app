import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import fortunetellerReducer from "./features/fortunetellerSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    fortuneteller: fortunetellerReducer
  },
});

export default store;
