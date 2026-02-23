import PropTypes from "prop-types";

import useUser from "@/hooks/useUser";
import TimeAgo from "@/shared/ui/TimeAgo";
import Avatar from "@/shared/ui/Avatar/Avatar";
import {
  AuthorName,
  AuthorNickname,
  Content,
  Header,
  SecondaryInfo,
  Text,
  Wrapper,
} from "./CommentCard.styled";

function CommentCard({ comment }) {
  const { content, authorId, createdAt, authorNickName } = comment;
  const { user } = useUser(authorId);

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim() || "?"
    : "?";

  return (
    <Wrapper>
      <Avatar
        src={user?.avatarUrl}
        initials={initials}
        size={40}
        linkTo={`/users/${authorId}`}
      />
      <Content>
        <Header>
          <AuthorName to={`/users/${authorId}`}>
            {user ? `${user.firstName} ${user.lastName}` : "..."}
          </AuthorName>
          <SecondaryInfo>
            <AuthorNickname>@{authorNickName}</AuthorNickname>
            <TimeAgo time={createdAt} />
          </SecondaryInfo>
        </Header>
        <Text>{content}</Text>
      </Content>
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
    authorNickName: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
