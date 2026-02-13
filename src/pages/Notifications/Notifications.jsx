import React from "react";
import PropTypes from "prop-types";
import {
  NotificationPostLink,
  NotificationsPost,
  UserInfoWrapper,
  Content,
} from "../Notifications/NotificationsStyled";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import { CloseButton } from "../Notifications/NotificationsStyled";
import PostDate from "../post/ui/PostDate";

export default function Notifications({notification}) {
  const {message,createdAt,link} = notification;
  return (
    <NotificationPostLink to={link}>
      <NotificationsPost>
        <UserInfoWrapper>
          <PostDate time={createdAt}/>
        </UserInfoWrapper>
        <Content>{message}</Content>
        <CloseButton>
          <Close />
        </CloseButton>
      </NotificationsPost>
    </NotificationPostLink>
  );
}
Notifications.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    type:PropTypes.string,
    createdAt: PropTypes.string,
    link: PropTypes.string
  })
};
