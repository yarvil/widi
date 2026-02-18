import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPostThunk,
  fetchCommentsThunk,
  setCurrentPost,
  clearComments,
} from "@/app/store/posts/postsSlice";
import {
  selectCurrentPost,
  selectComments,
  selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import { selectorSearch } from "@/app/store/search/searchSelectors";
import PageWrapper from "shared/ui/PageWrapper";
import FullPost from "./components/FullPost/FullPost";
import Loader from "@/app/store/authentication/Loader";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import CommentCard from "./components/CommentCard/CommentCard";
import CreatePostForm from "@/pages/feed/components/CreatePostForm/CreatePostForm";
import { PostCardWrapper } from "@/shared/components/post/PostCard/PostCard.styled";

export default function PostPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const feedPosts = useSelector(selectFeedPosts);
  const post = useSelector(selectCurrentPost);
  const comments = useSelector(selectComments);
  const searchValue = useSelector(selectorSearch);

  const filteredComments = comments
    .filter((comment) =>
      comment.content.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  useEffect(() => {
    dispatch(setCurrentPost(null));
    dispatch(clearComments());

    const postInFeed = feedPosts.find((p) => p.postId === postId);
    if (postInFeed) {
      dispatch(setCurrentPost(postInFeed));
    } else {
      dispatch(fetchPostThunk(postId));
    }
    dispatch(fetchCommentsThunk(postId));
  }, [postId, dispatch, feedPosts]);

  console.log(post);

  return (
    <PageWrapper>
      <PageHeader variant="back" title="Post" />
      {!post ? <Loader full={false} /> : <FullPost post={post} />}
      {post && (
        <CreatePostForm parentId={postId} isReply={true} username={post.name} />
      )}
      {filteredComments.map((comment) => (
        <PostCardWrapper key={comment.id}>
          <CommentCard comment={comment} />
        </PostCardWrapper>
      ))}
    </PageWrapper>
  );
}
