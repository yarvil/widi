import CreatePostForm from "shared/post/CreatePostForm/CreatePostForm";
import PostList from "pages/feed/ui/PostList";
import PageWrapper from "shared/ui/PageWrapper";

export default function FeedPage() {
  return (
    <>
      <PageWrapper>
        <CreatePostForm />
        <PostList />
      </PageWrapper>
    </>
  );
}
