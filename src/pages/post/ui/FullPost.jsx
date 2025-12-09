import PropTypes from "prop-types";

import {
  AuthorName,
  AuthorUsername,
  Text,
  Media,
  MediaWrapper,
} from "@/shared/post/PostCard/PostCard.styled";
import { Avatar } from "@/shared/post/PostCard/PostCard.styled";
import { FullPostWrapper, PostHeader, PostAuthor } from "./FullPost.styled";
import PostDate from "./PostDate";
import Actions from "@/shared/post/Actions/Actions";

function FullPost({ post }) {
  const { avatar, name, username, text, media, createdTime } = post;
  return (
    <FullPostWrapper>
      <PostHeader>
        <Avatar src={avatar} />
        <PostAuthor>
          <AuthorName>{name}</AuthorName>
          <AuthorUsername>@{username}</AuthorUsername>
        </PostAuthor>
      </PostHeader>
      <Text>{text}</Text>
      {media && (
        <MediaWrapper>
          <Media src={media} />
        </MediaWrapper>
      )}
      <PostDate time={createdTime} />
      <Actions post={post} withBorder />
    </FullPostWrapper>
  );
}

FullPost.propTypes = {
  post: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
    createdTime: PropTypes.number,
  }),
};

export default FullPost;
