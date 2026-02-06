import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import authSlice from "./authentication/authSlice";
import headerReducer from "./header/headerSlice"
import notificationsReducer from './notifications/notificationsSlice'
import searchSliceReducer from './search/searchSlice'
import favoriteSliceReducer from './favorite/favoriteSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer,
    header: headerReducer ,
    notifications: notificationsReducer,
    search: searchSliceReducer,
    favorites: favoriteSliceReducer,
  },
});
