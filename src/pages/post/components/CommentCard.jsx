import PropTypes from "prop-types";
import styled from "styled-components";
import TimeAgo from "@/shared/ui/TimeAgo";
import useUser from "@/hooks/useUser";

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #2f3336;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const AuthorName = styled.span`
  color: #e7e7e7;
  font-weight: 700;
  font-size: 15px;
`;

const Text = styled.p`
  color: #e7e7e7;
  margin: 0;
  font-size: 15px;
`;

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
