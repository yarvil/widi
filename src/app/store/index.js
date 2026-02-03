import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import authSlice from "./authentication/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer,
  },
});
