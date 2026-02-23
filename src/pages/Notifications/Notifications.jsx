import React from "react";
import PropTypes from "prop-types";
import {
  NotificationPostLink,
  NotificationsPost,
  UserInfoWrapper,
  Content,
} from "../Notifications/NotificationsStyled";
import { useDispatch } from "react-redux";
import CircleNotif from "@/shared/assets/icons/circle.svg?react";
import {
  readNotificationThunk,
  deleteNotificationThunk,
} from "@/app/store/notifications/notificationsSlice";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import { CloseButton } from "../Notifications/NotificationsStyled";
import PostDate from "../post/components/PostDate";

export default function Notifications({ notification }) {
  const { id, message, createdAt, link, isRead, type } = notification;
  const dispatch = useDispatch();
  const ID = link.split("/").pop();
  function handleLink() {
    switch (type) {
      case "FOLLOW":
        return `/users/${ID}`;
      case "NEW_POST":
        return `/post/${ID}`;
      case "COMMENT":
        return `/post/${ID}`;
      case "LIKE":
        return `/post/${ID}`;
    }
  }
  return (
    <>
      <NotificationPostLink
        to={handleLink()}
        onClick={() => dispatch(readNotificationThunk(id))}
      >
        <NotificationsPost>
          {!isRead && <CircleNotif />}
          <UserInfoWrapper>
            <PostDate time={createdAt} />
          </UserInfoWrapper>
          <Content>{message}</Content>
          <CloseButton>
            <Close
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(deleteNotificationThunk(id));
              }}
            />
          </CloseButton>
        </NotificationsPost>
      </NotificationPostLink>
    </>
  );
}
Notifications.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    isRead: PropTypes.bool,
    type: PropTypes.string,
    createdAt: PropTypes.string,
    link: PropTypes.string,
  }),
};
