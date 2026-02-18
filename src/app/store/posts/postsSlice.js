import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchFeed,
  fetchCurPost,
  createPostApi,
  fetchMyFeed,
  updatePostApi,
  deletePostApi,
  fetchSavedPostsApi,
} from "@/api/posts";
import { fetchComments, createCommentApi } from "@/api/comments";
import { savePostApi, toggleLikeApi, unsavePostApi } from "@/api/actions";

export const fetchFeedThunk = createAsyncThunk(
  "posts/fetchFeed",
  async (page = 0) => {
    return await fetchFeed(page);
  },
);

export const fetchMyFeedThunk = createAsyncThunk(
  "posts/fetchMyFeed",
  async (page = 0) => {
    return await fetchMyFeed(page);
  },
);

export const fetchPostThunk = createAsyncThunk(
  "posts/fetchPost",
  async (postId) => {
    return await fetchCurPost(postId);
  },
);

export const fetchCommentsThunk = createAsyncThunk(
  "posts/fetchComments",
  async (postId) => {
    return await fetchComments(postId);
  },
);

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async ({ content, imageUrl }) => {
    return await createPostApi(content, imageUrl);
  },
);

export const createCommentThunk = createAsyncThunk(
  "posts/createComment",
  async ({ postId, userId, content }) => {
    return await createCommentApi(postId, userId, content);
  },
);

export const updatePostThunk = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, content, imageUrl }) => {
    return await updatePostApi(postId, content, imageUrl);
  },
);

export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await deletePostApi(postId);
    return postId;
  },
);

export const fetchSavedPostsThunk = createAsyncThunk(
  "posts/fetchSavedPosts",
  async () => {
    return await fetchSavedPostsApi();
  },
);

export const toggleLikeThunk = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      return await toggleLikeApi(postId, userId);
    } catch {
      return rejectWithValue({ postId });
    }
  },
);

export const toggleSaveThunk = createAsyncThunk(
  "posts/toggleSave",
  async ({ postId, saved }, { rejectWithValue }) => {
    try {
      if (saved) {
        await unsavePostApi(postId);
        return { postId, saved: false };
      } else {
        await savePostApi(postId);
        return { postId, saved: true };
      }
    } catch {
      return rejectWithValue({ postId, saved });
    }
  },
);

const normalizePost = (post) => {
  if (!post) return null;
  return {
    postId: post.id,
    createdTime: post.createdAt,
    authorId: post.author.id,
    name: `${post.author.firstName} ${post.author.lastName}`,
    avatar: post.author.avatarUrl,
    text: post.content,
    media: post.imageUrl,
    likesCount: post.likesCount,
    commentsCount: post.commentsCount,
    repostsCount: post.repostsCount,
    quotesCount: post.quotesCount,
    liked: post.liked,
    saved: post.saved,
    isFollowing: post.author.isFollowing,
  };
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    feedPosts: [],
    myFeedPosts: [],
    savedPosts: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null,
    feedPagination: { page: 0, hasMore: true },
    myFeedPagination: { page: 0, hasMore: true },
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },

    clearComments: (state) => {
      state.comments = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // --- Feed ---
      .addCase(fetchFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.content.map(normalizePost);

        if (action.meta.arg === 0) {
          state.feedPosts = newPosts;
        } else {
          state.feedPosts.push(...newPosts);
        }

        state.feedPagination = {
          page: action.payload.number,
          hasMore: !action.payload.last,
        };
      })
      .addCase(fetchFeedThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load feed";
      })
      .addCase(fetchMyFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyFeedThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.content.map(normalizePost);

        if (action.meta.arg === 0) {
          state.myFeedPosts = newPosts;
        } else {
          state.myFeedPosts.push(...newPosts);
        }

        state.myFeedPagination = {
          page: action.payload.number,
          hasMore: !action.payload.last,
        };
      })
      .addCase(fetchMyFeedThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load my feed";
      })
      // --- Single post ---
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = normalizePost(action.payload);
      })
      .addCase(fetchPostThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load post";
      })
      // --- Comments ---
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load comments";
      })
      // --- Create post ---
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.feedPosts.unshift(normalizePost(action.payload));
        state.myFeedPosts.unshift(normalizePost(action.payload));
      })
      // --- Update post ---
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const updatedPost = normalizePost(action.payload);

        const postInFeed = state.feedPosts.find(
          (p) => p.postId === updatedPost.postId,
        );
        if (postInFeed) {
          Object.assign(postInFeed, updatedPost);
        }
        const postInMyFeed = state.myFeedPosts.find(
          (p) => p.postId === updatedPost.postId,
        );
        if (postInMyFeed) {
          Object.assign(postInMyFeed, updatedPost);
        }

        if (state.currentPost?.postId === updatedPost.postId) {
          state.currentPost = updatedPost;
        }
      })
      // --- Delete post ---
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        const postId = action.payload;

        state.feedPosts = state.feedPosts.filter((p) => p.postId !== postId);
        state.myFeedPosts = state.myFeedPosts.filter(
          (p) => p.postId !== postId,
        );

        if (state.currentPost?.postId === postId) {
          state.currentPost = null;
        }
      })
      // --- Create comment ---
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);

        const postId = action.payload.postId;

        if (state.currentPost && state.currentPost.postId === postId) {
          state.currentPost.commentsCount += 1;
        }

        const postInFeed = state.feedPosts.find((p) => p.postId === postId);
        if (postInFeed) {
          postInFeed.commentsCount += 1;
        }
      })
      // --- Toggle like ---
      .addCase(toggleLikeThunk.pending, (state, action) => {
        const { postId } = action.meta.arg;

        const updatePost = (post) => {
          if (post.postId === postId) {
            post.liked = !post.liked;
            post.likesCount += post.liked ? 1 : -1;
          }
        };

        state.feedPosts.forEach(updatePost);
        state.myFeedPosts.forEach(updatePost);
        if (state.currentPost?.postId === postId) {
          updatePost(state.currentPost);
        }
      })
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const { postId, liked, totalLikes } = action.payload;

        const syncPost = (post) => {
          if (post.postId === postId) {
            post.liked = liked;
            post.likesCount = totalLikes;
          }
        };

        state.feedPosts.forEach(syncPost);
        state.myFeedPosts.forEach(syncPost);
        if (state.currentPost?.postId === postId) {
          syncPost(state.currentPost);
        }
      })
      .addCase(toggleLikeThunk.rejected, (state, action) => {
        if (action.payload) {
          const { postId } = action.payload;

          const revertPost = (post) => {
            if (post.postId === postId) {
              post.liked = !post.liked;
              post.likesCount += post.liked ? 1 : -1;
            }
          };

          state.feedPosts.forEach(revertPost);
          state.myFeedPosts.forEach(revertPost);
          if (state.currentPost?.postId === postId) {
            revertPost(state.currentPost);
          }
        }
      })
      // --- Save post ---
      .addCase(toggleSaveThunk.pending, (state, action) => {
        const { postId, saved } = action.meta.arg;

        const updatePost = (post) => {
          if (post.postId === postId) {
            post.saved = !saved;
          }
        };

        state.feedPosts.forEach(updatePost);
        state.myFeedPosts.forEach(updatePost);
        state.savedPosts.forEach(updatePost);

        if (state.currentPost?.postId === postId) {
          state.currentPost.saved = !saved;
        }

        if (saved) {
          state.savedPosts = state.savedPosts.filter(
            (p) => p.postId !== postId,
          );
        }
      })
      .addCase(toggleSaveThunk.fulfilled, (state, action) => {
        const { postId, saved } = action.payload;

        const syncPost = (post) => {
          if (post.postId === postId) {
            post.saved = saved;
          }
        };

        state.feedPosts.forEach(syncPost);
        state.myFeedPosts.forEach(syncPost);
        state.savedPosts.forEach(syncPost);

        if (state.currentPost?.postId === postId) {
          state.currentPost.saved = saved;
        }

        if (!saved) {
          state.savedPosts = state.savedPosts.filter(
            (p) => p.postId !== postId,
          );
        }
      })
      .addCase(toggleSaveThunk.rejected, (state, action) => {
        if (action.payload) {
          const { postId, saved: oldSaved } = action.payload;

          const revertPost = (post) => {
            if (post.postId === postId) {
              post.saved = oldSaved;
            }
          };

          state.feedPosts.forEach(revertPost);
          state.myFeedPosts.forEach(revertPost);

          if (state.currentPost?.postId === postId) {
            state.currentPost.saved = oldSaved;
          }
        }
      })
      .addCase(fetchSavedPostsThunk.fulfilled, (state, action) => {
        state.savedPosts = action.payload.content.map((p) => ({
          ...normalizePost(p),
          saved: true,
        }));
      });
  },
});

export const { setCurrentPost, clearComments } = postsSlice.actions;
export default postsSlice.reducer;
