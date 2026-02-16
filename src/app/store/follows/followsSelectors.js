export const selectFollowingStatus = (state) => state.follows.isFollowing;
export const selectIsFollowing = (userId) => (state) =>
  state.follows.isFollowing[userId];
export const selectFollowsLoading = (state) => state.follows.loading;
