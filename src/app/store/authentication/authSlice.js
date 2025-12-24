import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const remember = localStorage.getItem("remember");
const userEmail = localStorage.getItem("userEmail");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: token ? true : false,
    userEmail: userEmail || "",
    remember: remember === "true",
    statusMessage: null,
    messageType: null,
  },
  reducers: {
    login: (state) => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
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
});

export const {
  login,
  logout,
  setUserEmail,
  setRemember,
  setStatusMessage,
  clearStatusMessage,
} = authSlice.actions;
export default authSlice.reducer;
