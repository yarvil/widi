import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import PostCard from "@/shared/post/PostCard/PostCard";
import { selectReplies } from "@/app/store/posts/postsSelectors";

function Replies({ reply }) {
  const allReplies = useSelector(selectReplies);
  const replyToReply = allReplies.find(
    (r) => String(r.parentId) === String(reply.postId)
  );

  return (
    <>
      <PostCard post={reply} withBottomLine={replyToReply} />
      {replyToReply && <PostCard post={replyToReply} withTopLine={true} />}
    </>
  );
}

Replies.propTypes = {
  reply: PropTypes.obj,
};

export default Replies;
