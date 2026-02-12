import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFeedPosts } from "@/app/store/posts/postsSelectors";
import { fetchMyFeedThunk } from "@/app/store/posts/postsSlice";
import PostCard from "shared/post/PostCard/PostCard";
import { PostCardWrapper } from "shared/post/PostCard/PostCard.styled";
import { selectorSearch } from "@/app/store/search/searchSelectors";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFeedPosts);
  const searchValue = useSelector(selectorSearch);

  useEffect(() => {
    dispatch(fetchMyFeedThunk());
  }, [dispatch]);

  const filteredPosts = posts
    .filter((post) =>
      post.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => b.createdTime - a.createdTime);

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
