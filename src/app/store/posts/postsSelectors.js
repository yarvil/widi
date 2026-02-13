export const selectFeedPosts = (state) => state.posts.feedPosts;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectComments = (state) => state.posts.comments;
export const savedPosts = (state)=> state.posts.savedPosts;
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;
