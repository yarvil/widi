import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyNotifications, readNotification, deleteNotification } from "@/api/notifications";

export const fetchMyNotificationsThunk = createAsyncThunk(
  "notifications/fetchMyNotifications",
  async () => {
    return await fetchMyNotifications();
  },
);
export const readNotificationThunk = createAsyncThunk(
  'notifications/readNotification',
  async (id) => {
    await readNotification(id)
    return id
  }
)
export const deleteNotificationThunk = createAsyncThunk(
  'notifications/deleteNotification',
  async (id) => {
    await deleteNotification(id)
    return id
  }

)

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
  reducers: {
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      );
    },
    addNotification: (state, action) => {
      const normalized = normalizeNotifications(action.payload);
      state.myFeedNotifications.unshift(normalized); 
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNotificationsThunk.fulfilled, (state, action) => {
        state.myFeedNotifications = action.payload.notifications.map(normalizeNotifications);
        console.log(action.payload)
      })
      .addCase(readNotificationThunk.fulfilled, (state, action) => {
        const notification = state.myFeedNotifications.find(
          n => n.id === action.payload
        );
        if (notification) {
          notification.isRead = true;
        }
      })
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        state.myFeedNotifications =
          state.myFeedNotifications.filter(n => n.id !== action.payload);
      })
  },
})
export const { removeNotification,addNotification } = notificationSlice.actions
export default notificationSlice.reducer