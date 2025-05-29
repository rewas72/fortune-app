import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import fortunetellerReducer from "./features/fortunetellerSlice"
import fortuneRequestReducer from "./features/fortuneRequestSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    fortuneteller: fortunetellerReducer,
    fortuneRequest: fortuneRequestReducer
  },
});

export default store;
