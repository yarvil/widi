import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import authSlice from "./authentication/authSlice";
import chatReducer from "./chat/slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer,
    chat: chatReducer,
  },
});
