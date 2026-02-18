import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUser, unfollowUser } from "@/api/follows";
import { subscribeToUser, unsubscribeToUser } from "@/api/notifications";

export const toggleFollowThunk = createAsyncThunk(
  "follows/toggleFollow",
  async ({ userId, isFollowing }, { rejectWithValue }) => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        await unsubscribeToUser(userId);
        return { userId, isFollowing: false };
      } else {
        await followUser(userId);
        await subscribeToUser(userId);
        return { userId, isFollowing: true };
      }
    } catch {
      return rejectWithValue({ userId, isFollowing });
    }
  },
);

const followsSlice = createSlice({
  name: "follows",
  initialState: {
    isFollowing: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFollowThunk.pending, (state, action) => {
        state.loading = true;
        const { userId, isFollowing } = action.meta.arg;
        state.isFollowing[userId] = !isFollowing;
      })
      .addCase(toggleFollowThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFollowThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { userId, isFollowing } = action.payload;
          state.isFollowing[userId] = isFollowing;
        }
      });
  },
});

export default followsSlice.reducer;
