export const selectFollowingStatus = (state) => state.follows.followingStatus;
export const selectIsFollowing = (userId) => (state) =>
  state.follows.followingStatus[userId];
export const selectFollowsLoading = (state) => state.follows.loading;
