import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import usePostActions from "@/hooks/usePostActions";
import TimeAgo from "@/shared/ui/TimeAgo";
import Actions from "@/shared/components/post/Actions/Actions";
import ModalWindow from "@/shared/ui/Modal/Modal";
import EditPostModal from "./EditPostModal";
import PostMenu from "../PostMenu/PostMenu";
import Avatar from "@/shared/ui/Avatar/Avatar";
import {
  Content,
  Header,
  AuthorName,
  Text,
  Media,
  MediaWrapper,
  PostContainer,
  ReplyLine,
  AvatarWrapper,
  UserInfo,
} from "./PostCard.styled";

function PostCard({ post, withTopLine = false, withBottomLine = false }) {
  const { postId, avatar, createdTime, name, authorId, text, media } = post;

  const {
    menuVariant,
    isFollowing,
    showEditModal,
    handleEdit,
    handleDelete,
    handleFollow,
    closeEditModal,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
  } = usePostActions({
    postId,
    authorId,
    following: post.isFollowing,
  });

  const getInitials = () => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || "?";
  };

  return (
    <>
      <PostContainer>
        <AvatarWrapper $withTopLine={withTopLine}>
          {withTopLine && <ReplyLine $topLine={withTopLine} />}
          <Avatar
            src={avatar}
            alt={name}
            initials={getInitials()}
            size={50}
            linkTo={`/users/${authorId}`}
          />
          {withBottomLine && <ReplyLine />}
        </AvatarWrapper>
        <Content>
          <Header>
            <UserInfo>
              <Link
                style={{ display: "flex", gap: "4px" }}
                to={`/users/${authorId}`}
              >
                <AuthorName>{name}</AuthorName>
              </Link>
              <TimeAgo time={createdTime} />
            </UserInfo>
            <PostMenu
              variant={menuVariant}
              isFollowing={isFollowing}
              onEdit={handleEdit}
              onDelete={openDeleteModal}
              onFollow={handleFollow}
            />
          </Header>
          <Link to={`/post/${postId}`}>
            <Text>{text}</Text>
            {media && (
              <MediaWrapper>
                <Media src={media} loading="lazy" />
              </MediaWrapper>
            )}
          </Link>
          <Actions post={post} />
        </Content>
      </PostContainer>

      {showEditModal && <EditPostModal post={post} onClose={closeEditModal} />}
      {showDeleteModal && (
        <ModalWindow
          title="Delete post?"
          desc="This can't be undone and it will be removed from your profile."
          primaryText="Delete"
          primaryClick={handleDelete}
          secondaryText="Cancel"
          secondaryClick={closeDeleteModal}
          closeModal={closeDeleteModal}
          dangerBtn
        />
      )}
    </>
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
    isFollowing: PropTypes.bool,
    saved: PropTypes.bool,
  }),
  withTopLine: PropTypes.bool,
  withBottomLine: PropTypes.bool,
};

export default PostCard;
