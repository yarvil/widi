import { useCallback, useEffect, useRef, useState } from "react";
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
import Loader from "@/shared/components/Loader";
import PostCard from "@/shared/components/post/PostCard/PostCard";
import { PostCardWrapper } from "@/shared/components/post/PostCard/PostCard.styled";
import {
  EmptyPostsDesc,
  EmptyPostsTitle,
  EmptyPostsWrapper,
  GoToFollowButton,
  LoadingIndicator,
  NewPostsButton,
} from "./PostList.styled";

export default function PostList({ variant = "following", sortBy = "newest" }) {
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const dispatch = useDispatch();

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

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
    dispatch(fetchThunk({ sort: sortBy }));
  }, [dispatch, fetchThunk, sortBy]);

  useEffect(() => {
    const checkNewPosts = async () => {
      try {
        const response = await fetchApi(0, 20, sortBy);
        const latestPostId = response.content[0]?.id;
        const currentFirstPostId = posts[0]?.postId;

        if (currentFirstPostId && latestPostId !== currentFirstPostId) {
          setHasNewPosts(true);
        }
      } catch (error) {
        console.error("Failed to check for new posts:", error);
      }
    };

    const interval = setInterval(checkNewPosts, 60000);
    return () => clearInterval(interval);
  }, [posts, fetchApi, sortBy]);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && pagination.hasMore && !loading) {
        dispatch(fetchThunk({ page: pagination.page + 1, sort: sortBy }));
      }
    },
    [
      pagination.hasMore,
      pagination.page,
      loading,
      dispatch,
      fetchThunk,
      sortBy,
    ],
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    const option = { root: null, rootMargin: "100px", threshold: 0 };

    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (element) observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver]);

  const handleShowNewPosts = () => {
    dispatch(fetchThunk({ sort: sortBy }));
    setHasNewPosts(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredPosts = posts.filter((post) =>
    post.text.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isJustCreated && !b.isJustCreated) return -1;
    if (!a.isJustCreated && b.isJustCreated) return 1;
    return 0;
  });

  if (loading && posts.length === 0) {
    return <Loader full={false} />;
  }

  if (!loading && posts.length === 0) {
    const emptyStateConfig = {
      following: {
        title: "Ой лишенько, у Вас тут зовсім пусто!",
        desc: "Підпишіться на когось, щоб побачити про що вони теревенять.",
        showButton: true,
      },
      foryou: {
        title: "Отакої, куди це всі поділися?!",
        desc: "Схоже Ви підписались на усіх користувачів. Ніхто не втече від Вашого пильного погляду.",
        showButton: false,
      },
    };

    const config = emptyStateConfig[variant];

    return (
      <EmptyPostsWrapper>
        <EmptyPostsTitle>{config.title}</EmptyPostsTitle>
        <EmptyPostsDesc>{config.desc}</EmptyPostsDesc>
        {config.showButton && (
          <GoToFollowButton to="/follow">Поїхали!</GoToFollowButton>
        )}
      </EmptyPostsWrapper>
    );
  }
  return (
    <>
      {hasNewPosts && (
        <NewPostsButton onClick={handleShowNewPosts}>
          Показати нові пости
        </NewPostsButton>
      )}
      {sortedPosts.map((post) => (
        <PostCardWrapper key={post.postId}>
          <PostCard post={post} />
        </PostCardWrapper>
      ))}
      {pagination.hasMore && (
        <div ref={loadMoreRef}>
          {loading && (
            <LoadingIndicator>
              <Loader full={false} />
            </LoadingIndicator>
          )}
        </div>
      )}
    </>
  );
}

PostList.propTypes = {
  variant: PropTypes.oneOf(["following", "foryou"]),
  sortBy: PropTypes.string,
};
