import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFeedPosts } from "@/app/store/posts/postsSelectors";
import { fetchFeedThunk } from "@/app/store/posts/postsSlice";
import PostCard from "@/shared/post/PostCard/PostCard";
import PageWrapper from "@/shared/ui/PageWrapper";
import { PostCardWrapper } from "@/shared/post/PostCard/PostCard.styled";
import { selectorSearch } from "@/app/store/search/searchSelectors";
// import { selectCurrentUser } from "@/app/store/authentication/authSelectors";

export default function PostUserList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFeedPosts);
  const searchValue = useSelector(selectorSearch);
  //   const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchFeedThunk());
  }, [dispatch]);

  //   console.log(posts);

  //   const filteredPosts = posts
  //     .filter((post) => {
  //       const [firstName, lastName] = post.name.split(" ");
  //       const myPosts =
  //         firstName === currentUser.firstName &&
  //         lastName === currentUser.lastName;

  //       const matchSearch = post.text
  //         .toLowerCase()
  //         .includes(searchValue.toLowerCase());
  //       return myPosts && matchSearch;
  //     })
  //     .sort((a, b) => b.createdTime - a.createdTime);
  //   console.log(filteredPosts);

  const filteredPosts = posts
    .filter((post) =>
      post.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => b.createdTime - a.createdTime);

  return (
    <PageWrapper>
      {filteredPosts.map((post) => (
        <PostCardWrapper key={post.postId}>
          <PostCard post={post} />
        </PostCardWrapper>
      ))}
    </PageWrapper>
  );
}
