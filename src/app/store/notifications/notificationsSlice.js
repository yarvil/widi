import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyNotifications } from "@/api/notifications";

export const fetchMyNotificationsThunk = createAsyncThunk(
  "notifications/fetchMyNotifications",
  async () => {
    return await fetchMyNotifications();
  },
);

const normalizeNotifications = (notification) => {
  if (!notification) return null;
  return {
    id: notification.id,
    createdAt: notification.createdAt,
    type: notification.type,
    message: notification.message,
    link: notification.link,
    isRead: notification.isRead,
  };
};
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    myFeedNotifications: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myFeedNotifications = action.payload.notifications.map(normalizeNotifications);
        console.log(action.payload)
      })
  },
})
export default notificationSlice.reducer