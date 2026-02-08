import { createSlice } from "@reduxjs/toolkit";


const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    hasNew: false,
  },
  reducers: {
    setNewNotification: (state) => {
      state.hasNew = true;
    },
    clearNotifications: (state) => {
      state.hasNew = false;
    },
  },
});


export const {setNewNotification,clearNotifications} = notificationsSlice.actions;
export default notificationsSlice.reducer