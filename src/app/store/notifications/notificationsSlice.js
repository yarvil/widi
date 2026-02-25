import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyNotifications, readNotification, deleteNotification, allNotificationsCount, readAllNotifications } from "@/api/notifications";

export const fetchMyNotificationsThunk = createAsyncThunk(
  "notifications/fetchMyNotifications",
  async () => {
    return await fetchMyNotifications();
  },
);

export const fetchAllNotificationsCountThunk = createAsyncThunk(
  'notifications/allnotificationscount',
  async () => {
    return await allNotificationsCount();
  }
)
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
export const readAllThunk = createAsyncThunk(
  'notifications/readAll',
  async () => {
    return await readAllNotifications();
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
    unreadCounts: 0,
    loading: false,
  },
  reducers: {
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      );
    },
    addNotification: (state, action) => {
      state.myFeedNotifications.unshift(action.payload);
      state.unreadCounts += 1;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNotificationsThunk.fulfilled, (state, action) => {
        state.myFeedNotifications = action.payload.notifications.map(normalizeNotifications);
      })
      .addCase(readNotificationThunk.fulfilled, (state, action) => {
        const notification = state.myFeedNotifications.find(
          n => n.id === action.payload
        );
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.unreadCounts -= 1
        }
      })
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        state.myFeedNotifications =
          state.myFeedNotifications.filter(n => n.id !== action.payload);
      })
      .addCase(fetchAllNotificationsCountThunk.fulfilled, (state, action) => {
        state.unreadCounts = action.payload
      })
      .addCase(readAllThunk.fulfilled, (state) => {
        state.myFeedNotifications = state.myFeedNotifications.map(notification=>({
          ...notification,
          isRead:true,
        }))
      })
      

  },
})
export const { removeNotification, addNotification } = notificationSlice.actions
export default notificationSlice.reducer