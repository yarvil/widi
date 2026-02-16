import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { savedPosts } from "@/app/store/posts/postsSelectors";
import PostCard from "@/shared/assets/components/post/PostCard/PostCard";
import { FavoriteWrapper, Favorites } from "./FavoriteListStyled";
import { selectorSearch } from "@/app/store/search/searchSelectors";
import { fetchSavedPostsThunk } from "@/app/store/posts/postsSlice";
import { useDispatch } from "react-redux";
export default function FavoriteList() {
  const savePost = useSelector(savedPosts);
  const searchValue = useSelector(selectorSearch);
  const dispatch = useDispatch();
  const filteredPosts = savePost
    .filter((post) =>
      post.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => b.createdTime - a.createdTime);
  useEffect(() => {
    dispatch(fetchSavedPostsThunk());
  }, [dispatch]);
  return (
    <Favorites>
      {filteredPosts.map((post) => (
        <FavoriteWrapper key={post.postId}>
          <PostCard post={post} withTopLine={false} withBottomLine={false} />
        </FavoriteWrapper>
      ))}
    </Favorites>
  );
}
