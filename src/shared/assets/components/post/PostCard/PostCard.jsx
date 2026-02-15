import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Avatar,
  Content,
  Header,
  AuthorName,
  Text,
  Media,
  MediaWrapper,
  PostContainer,
  ReplyLine,
  AvatarWrapper,
  MoreButton,
  DropdownMenu,
  MenuItem,
  SaveButton
} from "./PostCard.styled";
import TimeAgo from "@/shared/ui/TimeAgo";
import Actions from "@/shared/assets/components/post/Actions/Actions";
import { deletePostThunk } from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import MoreIcon from "@/shared/assets/icons/dots.svg?react";
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg?react'
import EditPostModal from "./EditPostModal";
import PostMenu from "../PostMenu/PostMenu";
import { toggleSaveThunk } from "@/app/store/posts/postsSlice";

function PostCard({ post, withTopLine = false, withBottomLine = false }) {
  const { postId, avatar, createdTime, name, authorId, text, media, saved } = post;
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const isMyPost = currentUser?.id === authorId;
  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      dispatch(deletePostThunk(postId));
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <PostContainer>
        <AvatarWrapper $withTopLine={withTopLine}>
          {withTopLine && <ReplyLine $topLine={withTopLine} />}
          <Link
            style={{ display: "flex", padding: "4px" }}
            to={`/users/${authorId}`}
          >
            <Avatar src={avatar} />
          </Link>
          {withBottomLine && <ReplyLine />}
        </AvatarWrapper>
        <Content>
          <Header>
            <Link
              style={{ display: "flex", gap: "4px" }}
              to={`/users/${authorId}`}
            >
              <AuthorName>{name}</AuthorName>
            </Link>
            <TimeAgo time={createdTime} />
            <SaveButton
                  $active={post.saved}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleSaveThunk({
                      postId,
                      saved
                    }));
                  }}
                >
                  <BookmarkIcon />
                </SaveButton>
            {isMyPost && (
              <PostMenu onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Header>
          <Link to={`/post/${postId}`}>
            <Text>{text}</Text>
            {media && (
              <MediaWrapper>
                <Media src={media} />
              </MediaWrapper>
            )}
          </Link>
          <Actions post={post} />
        </Content>
      </PostContainer>

      {showEditModal && (
        <EditPostModal post={post} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    avatar: PropTypes.string,
    createdTime: PropTypes.string,
    name: PropTypes.string,
    authorId: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
    saved: PropTypes.bool
  }),
  withTopLine: PropTypes.bool,
  withBottomLine: PropTypes.bool,
};

export default PostCard;
