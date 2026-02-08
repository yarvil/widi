import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import authSlice from "./authentication/authSlice";
import chatReducer from "./chat/slices/chatSlice";
import headerReducer from "./header/headerSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import searchSliceReducer from "./search/searchSlice";
import favoriteSliceReducer from "./favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer,
    chat: chatReducer,
    header: headerReducer,
    notifications: notificationsReducer,
    search: searchSliceReducer,
    favorites: favoriteSliceReducer,
  },
});
