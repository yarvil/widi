import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet } from "@/api/client";

const getInitialState = () => {
  const userEmail = localStorage.getItem("userEmail") || "";
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: false,
    token: token || null,
    user: null,
    userEmail,
    statusMessage: null,
    messageType: null,
    loading: true,
  };
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGet("api/user/me");

      return { isAuthenticated: true, user: response };
    } catch (error) {
      return rejectWithValue({
        statusMessage: `${error.response.status} ${error.response.data.message}`,
        messageType: "error",
      });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      state.isAuthenticated = false;
      state.user = null;
      state.userEmail = "";
      state.remember = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStatusMessage: (state, action) => {
      state.statusMessage = action.payload.message;
      state.messageType = action.payload.type;
    },
    clearStatusMessage: (state) => {
      state.statusMessage = null;
      state.messageType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.userEmail = action.payload.user.email;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        if (!state.token) {
          state.isAuthenticated = false;
          state.user = null;
        }
        if (action.payload) {
          state.statusMessage = action.payload.statusMessage;
          state.messageType = action.payload.messageType;
        }
      });
  },
});

export const {
  logout,
  setUserEmail,
  setRemember,
  setStatusMessage,
  clearStatusMessage,
} = authSlice.actions;
export default authSlice.reducer;
