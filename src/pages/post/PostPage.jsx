import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PageWrapper from "shared/ui/PageWrapper";
import {
  fetchPostThunk,
  fetchCommentsThunk,
  setCurrentPost,
} from "@/app/store/posts/postsSlice";
import FullPost from "./components/FullPost";
import CreatePostForm from "@/pages/feed/components/CreatePostForm/CreatePostForm";
import {
  selectCurrentPost,
  selectComments,
  selectLoading,
  selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import { PostCardWrapper } from "@/shared/assets/components/post/PostCard/PostCard.styled";
import CommentCard from "./components/CommentCard";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";

export default function PostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const feedPosts = useSelector(selectFeedPosts);
  const post = useSelector(selectCurrentPost);
  const comments = useSelector(selectComments);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const postInFeed = feedPosts.find((p) => p.postId === postId);
    if (postInFeed) {
      dispatch(setCurrentPost(postInFeed));
    } else {
      dispatch(fetchPostThunk(postId));
    }
    dispatch(fetchCommentsThunk(postId));
  }, [postId, dispatch, feedPosts]);

  if (loading) return <PageWrapper>Loading...</PageWrapper>;
  if (!post) return <PageWrapper>Post not found</PageWrapper>;

  return (
    <PageWrapper>
      <PageHeader variant="back" title="Post" />
      <FullPost post={post} />
      <CreatePostForm parentId={postId} isReply={true} username={post.name} />
      {comments.map((comment) => (
        <PostCardWrapper key={comment.id}>
          <CommentCard comment={comment} />
        </PostCardWrapper>
      ))}
    </PageWrapper>
  );
}
