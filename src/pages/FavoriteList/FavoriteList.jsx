import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { savedPosts } from "@/app/store/posts/postsSelectors";
import PostCard from "@/shared/components/post/PostCard/PostCard";
import {
  FavoriteWrapper,
  SaveWrapper,
  TitleSave,
  TextSave,
} from "./FavoriteListStyled";
import { selectorSearch } from "@/app/store/search/searchSelectors";
import { fetchSavedPostsThunk } from "@/app/store/posts/postsSlice";
import { useDispatch } from "react-redux";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "@/shared/ui/PageWrapper";
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
    <>
      <PageWrapper>
        <PageHeader title="Bookmarks" />
        {savePost.length === 0 && (
          <SaveWrapper>
            <TitleSave>Save posts for later</TitleSave>
            <TextSave>
              Bookmark posts to easily find them again in the future
            </TextSave>
          </SaveWrapper>
        )}
        {filteredPosts.map((post) => (
          <FavoriteWrapper key={post.postId}>
            <PostCard post={post} withTopLine={false} withBottomLine={false} />
          </FavoriteWrapper>
        ))}
      </PageWrapper>
    </>
  );
}
