import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUser, unfollowUser } from "@/api/follows";

export const toggleFollowThunk = createAsyncThunk(
  "follows/toggleFollow",
  async ({ userId, isFollowing }) => {
    if (isFollowing) {
      await unfollowUser(userId);
      return { userId, isFollowing: false };
    } else {
      await followUser(userId);
      return { userId, isFollowing: true };
    }
  },
);

const followsSlice = createSlice({
  name: "follows",
  initialState: {
    followingStatus: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFollowThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFollowThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, isFollowing } = action.payload;
        state.followingStatus[userId] = isFollowing;
      })
      .addCase(toggleFollowThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default followsSlice.reducer;
