import PropTypes from "prop-types";

import useUser from "@/hooks/useUser";
import TimeAgo from "@/shared/ui/TimeAgo";
import {
  AuthorName,
  Avatar,
  Header,
  Text,
  Wrapper,
} from "./CommentCard.styled";

function CommentCard({ comment }) {
  const { content, authorId, createdAt } = comment;
  const { user } = useUser(authorId);

  return (
    <Wrapper>
      {user?.avatarUrl && <Avatar src={user.avatarUrl} />}
      <div>
        <Header>
          <AuthorName>
            {user ? `${user.firstName} ${user.lastName}` : "..."}
          </AuthorName>
          <TimeAgo time={createdAt} />
        </Header>
        <Text>{content}</Text>
      </div>
    </Wrapper>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
