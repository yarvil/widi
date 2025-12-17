import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import authSlice from "./authentication/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    //місце для вашіх редюсерів :)
  },
});
