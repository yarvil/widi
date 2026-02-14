import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  selectMyFeedPosts,
  selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import { fetchMyFeedThunk, fetchFeedThunk } from "@/app/store/posts/postsSlice";
import PostCard from "@/shared/assets/components/post/PostCard/PostCard";
import { PostCardWrapper } from "@/shared/assets/components/post/PostCard/PostCard.styled";
import { selectorSearch } from "@/app/store/search/searchSelectors";

export default function PostList({ variant = "following" }) {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectorSearch);
  const posts = useSelector(
    variant === "following" ? selectMyFeedPosts : selectFeedPosts,
  );
  const fetchThunk =
    variant === "following" ? fetchMyFeedThunk : fetchFeedThunk;

  useEffect(() => {
    dispatch(fetchThunk());

    const interval = setInterval(() => {
      dispatch(fetchThunk());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, fetchThunk]);

  const filteredPosts = posts
    .filter((post) =>
      post.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

  return (
    <>
      {filteredPosts.map((post) => (
        <PostCardWrapper key={post.postId}>
          <PostCard post={post} />
        </PostCardWrapper>
      ))}
    </>
  );
}

PostList.propTypes = {
  variant: PropTypes.oneOf(["following", "foryou"]),
};
