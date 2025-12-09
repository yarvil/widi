import {
  ActionsWrapper,
  ActionButton,
  IconWrapper,
  Count,
} from "./Actions.styled";
import ReplyIcon from "shared/assets/icons/reply-icon.svg?react";
import LikeIcon from "shared/assets/icons/like-icon.svg?react";
import RepostIcon from "shared/assets/icons/repost-icon.svg?react";
import LikeIconFilled from "shared/assets/icons/like-icon-filled.svg?react";
import { useDispatch } from "react-redux";
import { toggleLike } from "@/app/store/posts/postsSlice";
import PropTypes from "prop-types";

function Actions({ post, withBorder }) {
  const { postId, replies, reposts, likes, liked, reposted } = post;
  const dispatch = useDispatch();
  const handleLikeClick = () => {
    dispatch(toggleLike(postId));
  };

  return (
    <ActionsWrapper $withBorder={withBorder}>
      <ActionButton type="button" $action="reply">
        <IconWrapper>
          <ReplyIcon />
        </IconWrapper>
        <Count $show={replies}>{replies}</Count>
      </ActionButton>
      <ActionButton type="button" $action="repost" $active={reposted}>
        <IconWrapper>
          <RepostIcon />
        </IconWrapper>
        <Count $show={reposts}>{reposts}</Count>
      </ActionButton>
      <ActionButton
        onClick={handleLikeClick}
        type="button"
        $action="like"
        $active={liked}
      >
        <IconWrapper>{liked ? <LikeIconFilled /> : <LikeIcon />}</IconWrapper>
        <Count $show={likes}>{likes}</Count>
      </ActionButton>
    </ActionsWrapper>
  );
}

Actions.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.number,
    replies: PropTypes.number,
    reposts: PropTypes.number,
    likes: PropTypes.number,
    liked: PropTypes.bool,
    reposted: PropTypes.bool,
  }),
  withBorder: PropTypes.bool,
};

export default Actions;
