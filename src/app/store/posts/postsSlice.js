import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchFeed, fetchPost, createPostApi } from "@/api/posts";
import { fetchComments, createCommentApi } from "@/api/comments";
import { toggleLikeApi } from "@/api/likes";

export const fetchFeedThunk = createAsyncThunk("posts/fetchFeed", async () => {
  return await fetchFeed();
});

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

export const toggleLikeThunk = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userId }) => {
    return await toggleLikeApi(postId, userId);
  },
);

// PostDto из API → внутренний формат
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
        post => post.postId !== action.payload
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
        state.feedPosts = action.payload.map(normalizePost);
      })
      .addCase(fetchFeedThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load feed";
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
        if (state.currentPost) {
          state.currentPost.commentsCount += 1;
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
      });
  },
});

export const { setCurrentPost,deletePost } = postsSlice.actions;
export default postsSlice.reducer;
