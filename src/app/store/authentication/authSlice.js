import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet } from "@/api/client";
import { showStatusMessage } from "./authThunk";
import { logoutApi } from "@/api/auth";
import { useEffect } from "react";

const getInitialState = () => {
  const userEmail = localStorage.getItem("userEmail") || "";

  return {
    isAuthenticated: false,
    user: null,
    userEmail,
    statusMessage: null,
    messageType: null,
    loading: true,
  };
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
          localStorage.setItem("token", token);
        }
      }, []);

      const response = await fetchGet("api/user/me");

      return { isAuthenticated: true, user: response };
    } catch (error) {
      const token = localStorage.getItem("token");

      if (error.response?.status === 401 && token) {
        localStorage.removeItem("token");

        dispatch(
          showStatusMessage({
            message: "Термін сесії закінчився. Увійдіть знову.",
            type: "error",
          }),
        );
      }
      return rejectWithValue({
        statusMessage: `${error.response.status} ${error.response.data.message}`,
        messageType: "error",
      });
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      localStorage.removeItem("token");

      return true;
    } catch (error) {
      localStorage.removeItem("token");

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
    updateCurrentUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
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
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const {
  updateCurrentUser,
  setUserEmail,
  setRemember,
  setStatusMessage,
  clearStatusMessage,
} = authSlice.actions;
export default authSlice.reducer;
