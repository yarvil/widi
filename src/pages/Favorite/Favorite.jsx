import PropTypes from "prop-types";
import React from "react";
import PostCard from "@/shared/assets/components/post/PostCard/PostCard";
export default function Favorite({ post }) {
  const { liked } = post;
  return (
    <>
      {liked && (
        <PostCard post={post} withTopLine={false} withBottomLine={false} />
      )}
    </>
  );
}

Favorite.propTypes = {
  post: PropTypes.shape({
    liked: PropTypes.bool,
  }),
};
