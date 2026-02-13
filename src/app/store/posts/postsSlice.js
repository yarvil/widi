import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchFeed,
  fetchPost,
  createPostApi,
  fetchMyFeed,
  updatePostApi,
  deletePostApi,
} from "@/api/posts";
import { fetchComments, createCommentApi } from "@/api/comments";
import { toggleLikeApi } from "@/api/likes";

export const fetchFeedThunk = createAsyncThunk("posts/fetchFeed", async () => {
  return await fetchFeed();
});
export const fetchMyFeedThunk = createAsyncThunk(
  "posts/fetchMyFeed",
  async () => {
    return await fetchMyFeed();
  },
);

export const fetchPostThunk = createAsyncThunk(
  "posts/fetchPost",
  async (postId) => {
    return await fetchPost(postId);
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

export const toggleLikeThunk = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userId }) => {
    return await toggleLikeApi(postId, userId);
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
    liked: false,
  };
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    feedPosts: [],
    myFeedPosts: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    deletePost: (state, action) => {
      state.feedPosts = state.feedPosts.filter(
        (post) => post.postId !== action.payload,
      );
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
        state.feedPosts = action.payload.content.map(normalizePost);
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
        state.feedPosts = action.payload.content.map(normalizePost);
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
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const { postId, liked, totalLikes } = action.payload;

        const inFeed = state.feedPosts.find((p) => p.postId === postId);
        if (inFeed) {
          inFeed.liked = liked;
          inFeed.likesCount = totalLikes;
        }

        if (state.currentPost?.postId === postId) {
          state.currentPost.liked = liked;
          state.currentPost.likesCount = totalLikes;
        }
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

        if (state.currentPost?.postId === updatedPost.postId) {
          state.currentPost = updatedPost;
        }
      })
      // --- Delete post ---
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        const postId = action.payload;

        state.feedPosts = state.feedPosts.filter((p) => p.postId !== postId);

        if (state.currentPost?.postId === postId) {
          state.currentPost = null;
        }
      });
  },
});

export const { setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
