import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "shared/ui/PageWrapper";
import {
  fetchPostThunk,
  fetchCommentsThunk,
  setCurrentPost,
} from "@/app/store/posts/postsSlice";
import FullPost from "./ui/FullPost";
import { ActionButton, IconWrapper } from "shared/post/Actions/Actions.styled";
import ArrowBack from "shared/assets/icons/arrow-left.svg?react";
import CreatePostForm from "shared/post/CreatePostForm/CreatePostForm";
import {
  selectCurrentPost,
  selectComments,
  selectLoading,
  selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import { PageHeader } from "./ui/FullPost.styled";
import { PostCardWrapper } from "shared/post/PostCard/PostCard.styled";
import CommentCard from "./ui/CommentCard";

export default function PostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <PageHeader>
        <ActionButton onClick={() => navigate(-1)}>
          <IconWrapper>
            <ArrowBack />
          </IconWrapper>
        </ActionButton>
        <h3>Post</h3>
      </PageHeader>
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
