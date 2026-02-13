import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  AuthorName,
  Text,
  Media,
  MediaWrapper,
  MoreButton,
  DropdownMenu,
  MenuItem,
} from "shared/post/PostCard/PostCard.styled";
import { Avatar } from "shared/post/PostCard/PostCard.styled";
import { FullPostWrapper, PostHeader, PostAuthor } from "./FullPost.styled";
import PostDate from "./PostDate";
import Actions from "shared/post/Actions/Actions";
import { Link } from "react-router-dom";
import { deletePostThunk } from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import MoreIcon from "@/shared/assets/icons/dots.svg?react";
import EditPostModal from "shared/post/PostCard/EditPostModal";

function FullPost({ post }) {
  const { avatar, name, authorId, text, media, createdTime, postId } = post;
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const isMyPost = currentUser?.id === authorId;

  const handleDelete = async () => {
    if (window.confirm("Delete this post?")) {
      await dispatch(deletePostThunk(postId));
      navigate("/"); // редирект на главную после удаления
    }
    setShowMenu(false);
  };

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  return (
    <>
      <FullPostWrapper>
        <PostHeader>
          <Avatar src={avatar} />
          <PostAuthor>
            <Link to={`/users/${authorId}`}>
              <AuthorName>{name}</AuthorName>
            </Link>
          </PostAuthor>
          {isMyPost && (
            <div style={{ marginLeft: "auto", position: "relative" }}>
              <MoreButton onClick={() => setShowMenu(!showMenu)}>
                <MoreIcon />
              </MoreButton>
              {showMenu && (
                <DropdownMenu>
                  <MenuItem onClick={handleEdit}>Edit post</MenuItem>
                  <MenuItem $danger onClick={handleDelete}>
                    Delete post
                  </MenuItem>
                </DropdownMenu>
              )}
            </div>
          )}
        </PostHeader>
        <Text>{text}</Text>
        {media && (
          <MediaWrapper>
            <Media src={media} />
          </MediaWrapper>
        )}
        <PostDate time={createdTime} />
        <Actions post={post} withBorder />
      </FullPostWrapper>

      {showEditModal && (
        <EditPostModal post={post} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}

FullPost.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    authorId: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
    createdTime: PropTypes.string,
  }),
};

export default FullPost;
