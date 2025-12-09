import styled from "styled-components";

import CreatePostForm from "shared/post/CreatePostForm/CreatePostForm";
import PostList from "pages/feed/ui/PostList";
import PageWrapper from "@/shared/ui/PageWrapper";

const FeedWrapper = styled(PageWrapper)`
  & > :first-child {
    /* border-bottom: 1px solid #2f3336; */
  }
`;

export default function FeedPage() {
  return (
    <FeedWrapper>
      <CreatePostForm />
      <PostList />
    </FeedWrapper>
  );
}
