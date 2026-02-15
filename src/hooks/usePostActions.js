import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePostThunk } from "@/app/store/posts/postsSlice";
import { toggleFollowThunk } from "@/app/store/follows/followsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { selectIsFollowing } from "@/app/store/follows/followsSelectors";

export default function usePostActions({
  postId,
  authorId,
  following,
  onDeleteSuccess,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const followStatusFromStore = useSelector(selectIsFollowing(authorId));
  const isFollowing = followStatusFromStore ?? following ?? false;

  const isMyPost = currentUser?.id === authorId;
  const menuVariant = isMyPost ? "owner" : "other";

  const handleDelete = async () => {
    if (window.confirm("Delete this post?")) {
      await dispatch(deletePostThunk(postId));
      onDeleteSuccess?.();
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleFollow = () => {
    dispatch(toggleFollowThunk({ userId: authorId, isFollowing }));
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return {
    menuVariant,
    isFollowing,
    showEditModal,
    handleEdit,
    handleDelete,
    handleFollow,
    closeEditModal,
  };
}
