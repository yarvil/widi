import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet } from "@/pages/auth/sendRequest";

const getInitialState = () => {
  const remember = localStorage.getItem("remember") === "true" || false;
  const userEmail = localStorage.getItem("userEmail") || "";
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: false,
    token,
    user: null,
    userEmail,
    remember,
    statusMessage: null,
    messageType: null,
  };
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = token
        ? await fetchGet("api/user/me", { token: token })
        : await fetchGet("api/user/me", { credentials: true });
      console.log(response);

      return { isAuthenticated: true, user: response };
    } catch (error) {
      //! ПОКИ БЕКУ НЕМАЄ, ПОТІМ ВИДАЛИТИ
      if (import.meta.env.DEV) {
        try {
          const res = await fetch("/mocks/me.json");
          const user = await res.json();
          return { isAuthenticated: true, user };
        } catch {
          //
        }
      }
      //! -------------------------------
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
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
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
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
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.userEmail = action.payload.user.email;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      if (!state.token) {
        state.isAuthenticated = false;
        state.user = null;
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
