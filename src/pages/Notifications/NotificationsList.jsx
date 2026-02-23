import React,{useEffect} from "react";
import Notifications from "./Notifications";
import {
  Notification,
  NotificationsWrapper,
} from "./NotificationsListStyle";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyNotificationsThunk} from "@/app/store/notifications/notificationsSlice";
import { selectFeedNotifications } from "@/app/store/notifications/notificationsSelector";


export default function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectFeedNotifications);
  useEffect(() => {
      dispatch(fetchMyNotificationsThunk());
    }, [dispatch]);
  return (
    <Notification>
      <NotificationsWrapper>
        {notifications.map((notification) => (
          <Notifications
            key={notification.id}
            notification={notification}
          />
        ))}
      </NotificationsWrapper>
    </Notification>
  );
}
