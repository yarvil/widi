import React from "react";
import PropTypes from "prop-types";
import {
  NotificationPostLink,
  NotificationsPost,
  UserInfoWrapper,
  Content,
} from "../Notifications/NotificationsStyled";
import { useDispatch } from "react-redux";
import CircleNotif from '@/shared/assets/icons/circle.svg?react'
import { readNotificationThunk } from "@/app/store/notifications/notificationsSlice";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import { CloseButton } from "../Notifications/NotificationsStyled";
import PostDate from "../post/components/PostDate";

export default function Notifications({ notification }) {
  const { id, message, createdAt, link, isRead } = notification;
  const dispatch = useDispatch()
  const postId = link.split("/").pop();
  return (
    <> 
      <NotificationPostLink  to={`/post/${postId}`} onClick={() => dispatch(readNotificationThunk(id))}>
        <NotificationsPost >
           {!isRead && <CircleNotif/>}
          <UserInfoWrapper>
            <PostDate time={createdAt} />
          </UserInfoWrapper>
          <Content>{message}</Content>
          <CloseButton>
            <Close />
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
    link: PropTypes.string
  })
};
