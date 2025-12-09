import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import PageWrapper from "@/shared/ui/PageWrapper";
import PostCard from "@/shared/post/PostCard/PostCard";
import {
  fetchPostThunk,
  fetchRepliesThunk,
  setCurrentPost,
} from "@/app/store/posts/postsSlice";
import FullPost from "./ui/FullPost";
import {
  ActionButton,
  IconWrapper,
} from "@/shared/post/Actions/Actions.styled";
import ArrowBack from "shared/assets/icons/arrow-left.svg?react";
import CreatePostForm from "@/shared/post/CreatePostForm/CreatePostForm";
import {
  selectCurrentPost,
  selectReplies,
  selectLoading,
  selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import { PageHeader } from "./ui/FullPost.styled";
import Replies from "./ui/Replies";
import { PostCardWrapper } from "../../shared/post/PostCard/PostCard.styled";

export default function PostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedPosts = useSelector(selectFeedPosts);
  const post = useSelector(selectCurrentPost);
  const replies = useSelector(selectReplies);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const postInFeed = feedPosts.find((post) => post.postId === postId);

    if (postInFeed) {
      dispatch(setCurrentPost(postInFeed));
    } else {
      dispatch(fetchPostThunk(postId));
    }
    dispatch(fetchRepliesThunk(postId));
  }, [postId, dispatch]);

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  if (!post) {
    return <PageWrapper>Post not found</PageWrapper>;
  }
  if (!replies) {
    return <PostCard>Loading...</PostCard>;
  }

  const replyToPost = replies.filter(
    (reply) => String(reply.parentId) === String(postId)
  );

  return (
    <PageWrapper>
      <PageHeader>
        <ActionButton onClick={() => navigate(-1)}>
          <IconWrapper>
            <ArrowBack />
          </IconWrapper>
        </ActionButton>
        <h3>Post</h3>
      </PageHeader>
      <FullPost post={post} />
      <CreatePostForm
        parentId={postId}
        isReply={true}
        username={post.username}
      />
      {replyToPost.map((reply) => (
        <PostCardWrapper key={reply.postId}>
          <Replies reply={reply} />
        </PostCardWrapper>
      ))}
    </PageWrapper>
  );
}
