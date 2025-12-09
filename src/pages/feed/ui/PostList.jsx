import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "../../../shared/post/PostCard/PostCard";
import { selectFeedPosts } from "@/app/store/posts/postsSelectors";
import { fetchFeedThunk } from "@/app/store/posts/postsSlice";
import { PostCardWrapper } from "../../../shared/post/PostCard/PostCard.styled";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFeedPosts);

  useEffect(() => {
    dispatch(fetchFeedThunk());
  }, [dispatch]);

  const sortedPosts = [...posts].sort((a, b) => b.createdTime - a.createdTime);

  return (
    <>
      {sortedPosts.map((post) => (
        <PostCardWrapper key={post.postId}>
          <PostCard post={post} />
        </PostCardWrapper>
      ))}
    </>
  );
}
