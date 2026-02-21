import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

import useUser from "@/hooks/useUser";
import usePostActions from "@/hooks/usePostActions";
import PostDate from "../PostDate";
import Actions from "@/shared/components/post/Actions/Actions";
import EditPostModal from "@/shared/components/post/PostCard/EditPostModal";
import PostMenu from "@/shared/components/post/PostMenu/PostMenu";
import Avatar from "@/shared/ui/Avatar/Avatar";
import {
  AuthorName,
  Text,
  Media,
  MediaWrapper,
  AuthorCounts,
} from "@/shared/components/post/PostCard/PostCard.styled";
import {
  FullPostWrapper,
  PostHeader,
  PostAuthor,
  UserInfo,
} from "./FullPost.styled";

function FullPost({ post }) {
  const { avatar, name, authorId, text, media, createdTime, postId } = post;
  const navigate = useNavigate();
  const { user } = useUser(authorId);

  const {
    menuVariant,
    isFollowing,
    showEditModal,
    handleEdit,
    handleDelete,
    handleFollow,
    closeEditModal,
  } = usePostActions({
    postId,
    authorId,
    following: user?.following,
    onDeleteSuccess: () => navigate("/"),
  });

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim() || "?"
    : "?";

  return (
    <>
      <FullPostWrapper>
        <PostHeader>
          <Avatar
            src={avatar}
            alt={name}
            initials={initials}
            size={50}
            linkTo={`/users/${authorId}`}
          />
          <UserInfo>
            <PostAuthor>
              <Link to={`/users/${authorId}`}>
                <AuthorName>{name}</AuthorName>
              </Link>
              {user && (
                <>
                  <AuthorCounts>Підписники: {user.followersCount}</AuthorCounts>
                  <AuthorCounts>Пости: {user.postsCount}</AuthorCounts>
                </>
              )}
            </PostAuthor>
            <PostMenu
              variant={menuVariant}
              isFollowing={isFollowing}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFollow={handleFollow}
            />
          </UserInfo>
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

      {showEditModal && <EditPostModal post={post} onClose={closeEditModal} />}
    </>
  );
}

FullPost.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    // username: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    authorId: PropTypes.string,
    text: PropTypes.string,
    media: PropTypes.string,
    createdTime: PropTypes.string,
  }),
};

export default FullPost;
