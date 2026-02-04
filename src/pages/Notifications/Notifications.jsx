import React from "react";
import PropTypes from "prop-types";
import {
    NotificationPostLink,
    NotificationsPost,
    UserInfoWrapper,
    Avatar,
    Name,
    Content,
} from '../Notifications/NotificationsStyled'
import Close from "../../image/close.svg?react"
import { CloseButton } from "../Notifications/NotificationsStyled";
import PostDate from "../post/ui/PostDate";

export default function Notifications({post,onClose}) {
    const {postId,avatar,name,createdTime} = post;
   const textNf = postId
  ? 'Public a new post'
  : 'Send a new message'
    function getHref() {
        if (textNf === 'Public a new post') {
            return `/post/${postId}`
        } else {
            return `/users/:id/chat`
        }
    }
    return (
        <NotificationPostLink href={getHref()}>
            <NotificationsPost>
                <UserInfoWrapper>
                    <Avatar src={avatar} />
                    <Name>{name}</Name>
                    <PostDate time={createdTime} />
                </UserInfoWrapper>
                <Content>
                    {textNf}
                </Content>
                <CloseButton onClick={
                    (e)=>{
                    e.preventDefault()
                    onClose()
                    }}><Close/></CloseButton>       
            </NotificationsPost>
        </NotificationPostLink>
    )
}
Notifications.propTypes = {
  post: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    postId: PropTypes.number,
    textNf:PropTypes.string,
    firstName:PropTypes.string,
    lastName : PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
    createdTime: PropTypes.number,
  }),
  onClose: PropTypes.func
};