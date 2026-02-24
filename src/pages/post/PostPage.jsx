import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPostThunk,
  fetchCommentsThunk,
  clearComments,
  setCurrentPost,
} from "@/app/store/posts/postsSlice";
import {
  selectCurrentPost,
  selectComments,
  selectLoading,
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

  const loading = useSelector(selectLoading);
  const post = useSelector(selectCurrentPost);
  const comments = useSelector(selectComments);
  const searchValue = useSelector(selectorSearch);

  const filteredComments = comments.filter((comment) =>
    comment.content.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    dispatch(setCurrentPost(null));
    dispatch(clearComments());

    dispatch(fetchPostThunk(postId));
    dispatch(fetchCommentsThunk(postId));
  }, [postId, dispatch]);

  return (
    <PageWrapper>
      <PageHeader variant="back" />
      {loading && !post ? (
        <Loader full={false} />
      ) : post ? (
        <>
          <FullPost post={post} />
          <CreatePostForm
            parentId={postId}
            isReply={true}
            username={post.nickName}
          />
          {filteredComments.map((comment) => (
            <PostCardWrapper key={comment.id}>
              <CommentCard comment={comment} />
            </PostCardWrapper>
          ))}
        </>
      ) : null}
    </PageWrapper>
  );
}
