import React from "react";
import Notifications from "../Notifications/Notifications";
import { Notification, NotificationsWrapper } from '../NotificationsList/NotificationsListStyle'
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "@/app/store/posts/postsSlice";
import {
    selectFeedPosts,
} from "@/app/store/posts/postsSelectors";

export default function NotificationList() {
    const dispatch = useDispatch()
    const posts = useSelector(selectFeedPosts);
    const handleDelete = (postId) => {
        dispatch(deletePost(postId))
        console.log("Post with id:" + ' ' + postId + ' ' + "deleted!")
    }
    return (
        <Notification>
            <NotificationsWrapper>
                {posts.map(post => (
                    <Notifications key={post.postId} post={post} onClose={() => handleDelete(post.postId)} />
                ))}
            </NotificationsWrapper>
        </Notification>
    )
}