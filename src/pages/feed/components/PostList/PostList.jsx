import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { fetchFeed, fetchMyFeed } from "@/api/posts";
import { fetchMyFeedThunk, fetchFeedThunk } from "@/app/store/posts/postsSlice";
import {
  selectMyFeedPosts,
  selectFeedPosts,
  selectLoading,
  selectMyFeedPagination,
  selectFeedPagination,
} from "@/app/store/posts/postsSelectors";
import { selectorSearch } from "@/app/store/search/searchSelectors";
import Loader from "@/app/store/authentication/Loader";
import PostCard from "@/shared/assets/components/post/PostCard/PostCard";
import { PostCardWrapper } from "@/shared/assets/components/post/PostCard/PostCard.styled";
import { LoadMoreButton, NewPostsButton } from "./PostList.styled";

export default function PostList({ variant = "following", sortBy = "latest" }) {
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const searchValue = useSelector(selectorSearch);
  const posts = useSelector(
    variant === "following" ? selectMyFeedPosts : selectFeedPosts,
  );
  const pagination = useSelector(
    variant === "following" ? selectMyFeedPagination : selectFeedPagination,
  );

  const fetchApi = variant === "following" ? fetchMyFeed : fetchFeed;
  const fetchThunk =
    variant === "following" ? fetchMyFeedThunk : fetchFeedThunk;

  useEffect(() => {
    dispatch(fetchThunk(0));
  }, [dispatch, fetchThunk]);

  useEffect(() => {
    const checkNewPosts = async () => {
      try {
        const response = await fetchApi(0);
        const latestPostId = response.content[0]?.id;
        const currentFirstPostId = posts[0]?.postId;

        if (
          latestPostId &&
          currentFirstPostId &&
          latestPostId !== currentFirstPostId
        ) {
          setHasNewPosts(true);
        }
      } catch (error) {
        console.error("Failed to check for new posts:", error);
      }
    };

    const interval = setInterval(checkNewPosts, 30000);
    return () => clearInterval(interval);
  }, [posts, fetchApi]);

  const handleShowNewPosts = () => {
    dispatch(fetchThunk(0));
    setHasNewPosts(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    dispatch(fetchThunk(pagination.page + 1));
  };

  const filteredPosts = posts
    .filter((post) =>
      post.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "top") {
        return b.likesCount - a.likesCount;
      }
      return new Date(b.createdTime) - new Date(a.createdTime);
    });

  if (loading && posts.length === 0) {
    return <Loader />;
  }

  return (
    <>
      {hasNewPosts && (
        <NewPostsButton onClick={handleShowNewPosts}>
          Show new posts
        </NewPostsButton>
      )}
      {filteredPosts.map((post) => (
        <PostCardWrapper key={post.postId}>
          <PostCard post={post} />
        </PostCardWrapper>
      ))}
      {pagination.hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </LoadMoreButton>
      )}
    </>
  );
}

PostList.propTypes = {
  variant: PropTypes.oneOf(["following", "foryou"]),
  sortBy: PropTypes.string,
};
