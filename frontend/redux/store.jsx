import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import fortunetellerReducer from "./features/fortunetellerSlice"
import fortuneRequestReducer from "./features/fortuneRequestSlice";
import reviewReducer from "./features/reviewSlice";
import fortuneReducer from "./features/fortuneSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    fortuneteller: fortunetellerReducer,
    fortuneRequest: fortuneRequestReducer,
    review : reviewReducer,
    fortune: fortuneReducer
  },
});

export default store;
