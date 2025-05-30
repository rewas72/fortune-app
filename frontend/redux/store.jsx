import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import fortunetellerReducer from "./features/fortunetellerSlice"
import fortuneRequestReducer from "./features/fortuneRequestSlice";
import reviewReducer from "./features/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    fortuneteller: fortunetellerReducer,
    fortuneRequest: fortuneRequestReducer,
    review : reviewReducer
  },
});

export default store;
