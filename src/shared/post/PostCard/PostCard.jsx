import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Content,
  Header,
  AuthorName,
  Text,
  Media,
  MediaWrapper,
  PostContainer,
  ReplyLine,
  AvatarWrapper,
} from "./PostCard.styled";
import TimeAgo from "@/shared/ui/TimeAgo";
import Actions from "shared/post/Actions/Actions";

function PostCard({ post, withTopLine = false, withBottomLine = false }) {
  const { postId, avatar, createdTime, name, authorId, text, media } = post;

  return (
    <PostContainer>
      <AvatarWrapper $withTopLine={withTopLine}>
        {withTopLine && <ReplyLine $topLine={withTopLine} />}
        <Link
          style={{ display: "flex", padding: "4px" }}
          to={`/users/${authorId}`}
        >
          <Avatar src={avatar} />
        </Link>
        {withBottomLine && <ReplyLine />}
      </AvatarWrapper>
      <Content>
        <Header>
          <Link
            style={{ display: "flex", gap: "4px" }}
            to={`/users/${authorId}`}
          >
            <AuthorName>{name}</AuthorName>
          </Link>
          <TimeAgo time={createdTime} />
        </Header>
        <Link to={`/post/${postId}`}>
          <Text>{text}</Text>
          {media && (
            <MediaWrapper>
              <Media src={media} />
            </MediaWrapper>
          )}
        </Link>
        <Actions post={post} />
      </Content>
    </PostContainer>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    avatar: PropTypes.string,
    createdTime: PropTypes.string,
    name: PropTypes.string,
    authorId: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
  }),
  withTopLine: PropTypes.bool,
  withBottomLine: PropTypes.bool,
};

export default PostCard;
