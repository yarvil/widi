import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchFeed } from "@/pages/feed/api/fetchFeed";
import { fetchPost } from "@/pages/post/api/fetchPost";
import { fetchReplies } from "@/pages/post/api/fetchReplies";

export const fetchFeedThunk = createAsyncThunk("posts/fetchFeed", async () => {
  return await fetchFeed();
});

export const fetchPostThunk = createAsyncThunk(
  "posts/fetchPost",
  async (postId) => {
    return await fetchPost(postId);
  }
);

export const fetchRepliesThunk = createAsyncThunk(
  "posts/fetchReplies",
  async (postId) => {
    return await fetchReplies(postId);
  }
);

const normalizePost = (post) => {
  if (!post) {
    return null;
  }
  return {
    postId: post.postId,
    parentId: post.parentId || null,
    createdTime: post.createdTime,
    username: post.user.username,
    name: post.user.name,
    avatar: post.user.avatar,
    text: post.text,
    media: post.media,
    replies: post.actions.replies,
    likes: post.actions.likes,
    reposts: post.actions.reposts,
    liked: post.actions.liked,
    reposted: post.actions.reposted,
  };
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    feedPosts: [],
    currentPost: null,
    replies: [],
    loading: false,
    error: null,
  },
  reducers: {
    createPost: (state, action) => {
      const newPost = action.payload;

      if (!newPost.parentId) {
        state.feedPosts.unshift(newPost);
        state.currentPost = newPost;
      } else {
        state.replies.unshift(newPost);

        if (
          state.currentPost &&
          Number(state.currentPost.postId) === Number(newPost.parentId)
        ) {
          state.currentPost.replies += 1;
        }
      }
    },

    toggleLike: (state, action) => {
      const postId = action.payload;
      const post = state.feedPosts.find(
        (post) => Number(post.postId) === Number(postId)
      );

      if (post) {
        if (post.liked) {
          post.liked = false;
          post.likes -= 1;
        } else {
          post.liked = true;
          post.likes += 1;
        }

        if (
          state.currentPost &&
          Number(state.currentPost.postId) === Number(postId)
        ) {
          state.currentPost = post;
        }
        return;
      }

      if (
        state.currentPost &&
        Number(state.currentPost.postId) === Number(postId)
      ) {
        if (state.currentPost.liked) {
          state.currentPost.liked = false;
          state.currentPost.likes -= 1;
        } else {
          state.currentPost.liked = true;
          state.currentPost.likes += 1;
        }
        return;
      }

      const reply = state.replies.find((reply) => reply.postId === postId);
      if (reply) {
        if (reply.liked) {
          reply.liked = false;
          reply.likes -= 1;
        } else {
          reply.liked = true;
          reply.likes += 1;
        }
        return;
      }
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feedPosts = action.payload.map((post) => normalizePost(post));
      })
      .addCase(fetchFeedThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load feed";
      })
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.currentPost = normalizePost(action.payload);
        }
      })
      .addCase(fetchPostThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load post";
      })
      .addCase(fetchRepliesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepliesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = action.payload.map((reply) => normalizePost(reply));
      })
      .addCase(fetchRepliesThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load replies";
      });
  },
});

export const { createPost, toggleLike, setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
