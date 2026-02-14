import { createSlice } from "@reduxjs/toolkit";
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    hasNewFavs: false,
  },
  reducers: {
    setNewFavorites: (state) => {
      state.hasNewFavs = true;
    },
    clearFavorites: (state) => {
      state.hasNewFavs = false;
    },
  },
});

export const {setNewFavorites,clearFavorites} = favoriteSlice.actions;
export default favoriteSlice.reducer