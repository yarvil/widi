import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  searchUsers,
  fetchUserById,
  updateUserProfile,
  updateUserNickName,
} from "@/api/users";
import { updateCurrentUser } from "../authentication/authSlice";
import { fetchGet } from "@/api/client";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    return await fetchUsers();
  },
);

export const searchUsersThunk = createAsyncThunk(
  "users/searchUsers",
  async (query) => {
    return await searchUsers(query);
  },
);

export const fetchUserByIdThunk = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    return await fetchUserById(userId);
  },
);

export const updateUserProfileThunk = createAsyncThunk(
  "users/updateUserProfile",
  async (data, { dispatch, getState }) => {
    await updateUserProfile(data);
    const fullUserData = await fetchGet("api/user/me");
    const currentUserId = getState().auth.user?.id;

    if (currentUserId === fullUserData.id) {
      dispatch(updateCurrentUser(fullUserData));
    }

    return fullUserData;
  },
);

export const updateNickNameThunk = createAsyncThunk(
  "users/updateNickName",
  async (nickName, { dispatch, getState }) => {
    const fullUserData = await updateUserNickName(nickName);
    const currentUserId = getState().auth.user?.id;

    if (currentUserId === fullUserData.id) {
      dispatch(updateCurrentUser(fullUserData));
    }

    return fullUserData;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchResults: [],
    currentProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNickNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNickNameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(updateNickNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSearchResults } = usersSlice.actions;
export default usersSlice.reducer;
