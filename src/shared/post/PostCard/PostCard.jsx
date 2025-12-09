import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Content,
  Header,
  AuthorName,
  AuthorUsername,
  Text,
  Media,
  MediaWrapper,
  PostContainer,
  ReplyLine,
  AvatarWrapper,
} from "./PostCard.styled";
import TimeAgo from "pages/feed/ui/TimeAgo";
import Actions from "shared/post/Actions/Actions";

function PostCard({ post, withTopLine = false, withBottomLine = false }) {
  const { postId, avatar, createdTime, name, username, text, media } = post;
  return (
    <PostContainer>
      <AvatarWrapper $withTopLine={withTopLine}>
        {withTopLine && <ReplyLine $topLine={withTopLine} />}

        <Link
          style={{ display: "flex", padding: "4px" }}
          to={`/users/${username}`}
        >
          <Avatar src={avatar} />
        </Link>
        {withBottomLine && <ReplyLine />}
      </AvatarWrapper>
      <Content>
        <Header>
          <Link
            style={{ display: "flex", gap: "4px" }}
            to={`/users/${username}`}
          >
            <AuthorName>{name}</AuthorName>
            <AuthorUsername>@{username}</AuthorUsername>
          </Link>
          <TimeAgo time={createdTime} />
        </Header>
        <Link to={`/${username}/post/${postId}`}>
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
    postId: PropTypes.number,
    avatar: PropTypes.string,
    createdTime: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
  }),
  withTopLine: PropTypes.bool,
  withBottomLine: PropTypes.bool,
};

export default PostCard;
