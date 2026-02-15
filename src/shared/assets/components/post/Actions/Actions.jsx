import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  ActionsWrapper,
  ActionButton,
  IconWrapper,
  Count,
} from "./Actions.styled";
import ReplyIcon from "shared/assets/icons/reply-icon.svg?react";
import LikeIcon from "shared/assets/icons/like-icon.svg?react";
import LikeIconFilled from "shared/assets/icons/like-icon-filled.svg?react";
import { toggleLikeThunk } from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { setNewFavorites ,clearFavorites} from "@/app/store/favorite/favoriteSlice";

function Actions({ post, withBorder }) {
  const { postId, commentsCount, likesCount, liked } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleLikeClick = () => {
    if (!currentUser) return;
    dispatch(toggleLikeThunk({ postId, userId: currentUser.id }));
    if (!liked) {
      dispatch(setNewFavorites());
    }else{
      dispatch(clearFavorites())
    }
  };

  const handleReplyClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <ActionsWrapper $withBorder={withBorder}>
      <ActionButton type="button" $action="reply" onClick={handleReplyClick}>
        <IconWrapper>
          <ReplyIcon />
        </IconWrapper>
        <Count $show={commentsCount}>{commentsCount}</Count>
      </ActionButton>
      <ActionButton
        onClick={handleLikeClick}
        type="button"
        $action="like"
        $active={liked}
      >
        <IconWrapper>{liked ? <LikeIconFilled /> : <LikeIcon />}</IconWrapper>
        <Count $show={likesCount}>{likesCount}</Count>
      </ActionButton>
    </ActionsWrapper>
  );
}

Actions.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    commentsCount: PropTypes.number,
    likesCount: PropTypes.number,
    liked: PropTypes.bool,
  }),
  withBorder: PropTypes.bool,
};

export default Actions;
