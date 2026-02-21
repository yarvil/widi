import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  setNewFavorites,
  clearFavorites,
} from "@/app/store/favorite/favoriteSlice";
import { toggleLikeThunk, toggleSaveThunk } from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import ReplyIcon from "@/shared/assets/icons/message-circle.svg?react";
import LikeIcon from "@/shared/assets/icons/heart-action.svg?react";
import SaveIcon from "@/shared/assets/icons/bookmark-action.svg?react";
import {
  ActionsWrapper,
  ActionButton,
  IconWrapper,
  Count,
} from "./Actions.styled";

function Actions({ post, withBorder }) {
  const { postId, commentsCount, likesCount, liked, saved } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleLikeClick = () => {
    if (!currentUser) return;
    dispatch(toggleLikeThunk({ postId, userId: currentUser.id }));
    if (!liked) {
      dispatch(setNewFavorites());
    } else {
      dispatch(clearFavorites());
    }
  };

  const handleReplyClick = () => {
    navigate(`/post/${postId}`);
  };

  const handleSaveClick = () => {
    dispatch(
      toggleSaveThunk({
        postId,
        saved,
      }),
    );
  };

  const ACTIONS = [
    {
      label: "reply",
      icon: <ReplyIcon />,
      onClick: handleReplyClick,
      hasCounter: true,
      counter: commentsCount,
    },
    {
      label: "like",
      active: liked,
      icon: <LikeIcon />,
      onClick: handleLikeClick,
      hasCounter: true,
      counter: likesCount,
    },
    {
      label: "save",
      active: saved,
      icon: <SaveIcon />,
      onClick: handleSaveClick,
      hasCounter: false,
    },
  ];

  return (
    <ActionsWrapper $withBorder={withBorder}>
      {ACTIONS.map((item, index) => (
        <ActionButton
          key={index}
          type="button"
          $action={item.label}
          $active={item.active}
          onClick={item.onClick}
        >
          <IconWrapper>{item.icon}</IconWrapper>
          {item.hasCounter && (
            <Count $show={item.counter > 0}>
              {item.counter > 0 ? item.counter : ""}
            </Count>
          )}
        </ActionButton>
      ))}
    </ActionsWrapper>
  );
}

Actions.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    commentsCount: PropTypes.number,
    likesCount: PropTypes.number,
    liked: PropTypes.bool,
    saved: PropTypes.bool,
  }),
  withBorder: PropTypes.bool,
};

export default Actions;
