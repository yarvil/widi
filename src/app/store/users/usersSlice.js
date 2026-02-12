import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers, searchUsers } from "@/api/users";

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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchResults: [],
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
      });
  },
});

export const { clearSearchResults } = usersSlice.actions;
export default usersSlice.reducer;
