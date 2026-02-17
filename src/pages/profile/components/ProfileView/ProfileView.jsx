import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { toggleFollowThunk } from "@/app/store/follows/followsSlice";
import { subscribeToUser, unsubscribeToUser } from "@/api/notifications";
import { createNewThread } from "@/app/store/chat/chatThunks";
import PostCard from "@/shared/components/post/PostCard/PostCard";
import Loader from "@/app/store/authentication/Loader";

import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import {
  ProfileContainer,
  HeaderImage,
  AvatarWrapper,
  Avatar,
  ProfileInfo,
  ProfileActions,
  EditButton,
  FollowButton,
  MessageButton,
  SubscribeButton,
  UserName,
  UserHandle,
  UserBio,
  UserDetails,
  DetailItem,
  FollowStats,
  StatItem,
  StatValue,
  StatLabel,
  FollowingModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalUserItem,
  ModalUserAvatar,
  ModalUserAvatarPlaceholder,
  ModalUserInfo,
  AvatarInitials,
  PostsSection,
  PostCardWrapper,
} from "./ProfileView.styled";

export default function ProfileView({
  profile,
  isOwnProfile,
  isFollowing,
  isSubscribed,
  onEdit,
  onFollowChange,
  onSubscribeChange,
  onShowFollowing,
  onShowFollowers,
  followingList,
  followersList,
  showFollowingModal,
  showFollowersModal,
  onCloseFollowingModal,
  onCloseFollowersModal,
  userPosts,
  postsLoading,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await dispatch(
        toggleFollowThunk({ userId: profile.id, isFollowing }),
      ).unwrap();
      onFollowChange(!isFollowing);
    } catch (error) {
      console.error("Failed to toggle follow", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribeToUser(profile.id);
        onSubscribeChange(false);
      } else {
        await subscribeToUser(profile.id);
        onSubscribeChange(true);
      }
    } catch (error) {
      console.error("Failed to toggle subscription", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    try {
      await dispatch(createNewThread(profile.id)).unwrap();
      navigate("/chat");
    } catch (error) {
      console.error("Failed to create thread", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <PageHeader variant="back" title={profile.firstName || "Profile"} />
      <ProfileContainer>
        <HeaderImage
          $hasImage={!!profile.backgroundImg}
          $imageUrl={profile.backgroundImg}
        />
        <AvatarWrapper>
          <Avatar $hasImage={!!profile.avatarUrl} $imageUrl={profile.avatarUrl}>
            {!profile.avatarUrl && (
              <AvatarInitials>
                {`${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.trim() ||
                  "?"}
              </AvatarInitials>
            )}
          </Avatar>
        </AvatarWrapper>

        <ProfileInfo>
          <ProfileActions>
            {isOwnProfile ? (
              <EditButton onClick={onEdit}>Edit profile</EditButton>
            ) : (
              <>
                <MessageButton onClick={handleMessage} disabled={loading}>
                  Message
                </MessageButton>
                <FollowButton
                  $following={isFollowing}
                  onClick={handleFollow}
                  disabled={loading}
                >
                  {isFollowing ? (
                    <>
                      <span className="default-text">Following</span>
                      <span className="hover-text">Unfollow</span>
                    </>
                  ) : (
                    "Follow"
                  )}
                </FollowButton>
              </>
            )}
          </ProfileActions>

          <UserName>
            {profile.firstName} {profile.lastName}
          </UserName>
          <UserHandle>@{profile.email?.split("@")[0] || "user"}</UserHandle>

          {profile.bio && <UserBio>{profile.bio}</UserBio>}

          <UserDetails>
            {profile.email && (
              <DetailItem>
                <span>✉️</span> {profile.email}
              </DetailItem>
            )}
          </UserDetails>

          <FollowStats>
            <StatItem onClick={onShowFollowing} $clickable={true}>
              <StatValue>{profile.followingCount || 0}</StatValue>
              <StatLabel>Following</StatLabel>
            </StatItem>
            <StatItem onClick={onShowFollowers} $clickable={true}>
              <StatValue>{profile.followersCount || 0}</StatValue>
              <StatLabel>Followers</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{profile.postsCount || 0}</StatValue>
              <StatLabel>Posts</StatLabel>
            </StatItem>
          </FollowStats>

          {!isOwnProfile && isFollowing && (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SubscribeButton
                $subscribed={isSubscribed}
                onClick={handleSubscribe}
                disabled={loading}
              >
                {isSubscribed
                  ? "Unsubscribe from notifications"
                  : "Subscribe to notifications"}
              </SubscribeButton>
            </div>
          )}
        </ProfileInfo>
      </ProfileContainer>

      <PostsSection>
        {postsLoading ? (
          <div
            style={{
              padding: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        ) : userPosts.length === 0 ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#6e767d" }}
          >
            No posts yet
          </div>
        ) : (
          userPosts.map((post) => (
            <PostCardWrapper key={post.postId}>
              <PostCard post={post} />
            </PostCardWrapper>
          ))
        )}
      </PostsSection>

      {showFollowingModal && (
        <FollowingModal>
          <ModalOverlay onClick={onCloseFollowingModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2 style={{ color: "#fff", margin: 0 }}>Following</h2>
              <ModalCloseButton onClick={onCloseFollowingModal}>
                ×
              </ModalCloseButton>
            </ModalHeader>
            {followingList.length === 0 ? (
              <p
                style={{
                  color: "#6e767d",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                You haven't followed anyone yet
              </p>
            ) : (
              <div>
                {followingList.map((user) => {
                  const initials =
                    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim() ||
                    "?";
                  return (
                    <Link
                      key={user.id}
                      to={`/users/${user.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={onCloseFollowingModal}
                    >
                      <ModalUserItem>
                        {user.avatarUrl ? (
                          <ModalUserAvatar
                            src={user.avatarUrl}
                            alt={user.firstName}
                          />
                        ) : (
                          <ModalUserAvatarPlaceholder $initials={initials}>
                            {initials}
                          </ModalUserAvatarPlaceholder>
                        )}
                        <ModalUserInfo>
                          <p
                            style={{
                              color: "#fff",
                              margin: 0,
                              fontWeight: 600,
                            }}
                          >
                            {user.firstName} {user.lastName}
                          </p>
                          <p
                            style={{
                              color: "#6e767d",
                              margin: 0,
                              fontSize: "14px",
                            }}
                          >
                            @{user.email?.split("@")[0] || "user"}
                          </p>
                        </ModalUserInfo>
                      </ModalUserItem>
                    </Link>
                  );
                })}
              </div>
            )}
          </ModalContent>
        </FollowingModal>
      )}

      {showFollowersModal && (
        <FollowingModal>
          <ModalOverlay onClick={onCloseFollowersModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2 style={{ color: "#fff", margin: 0 }}>Followers</h2>
              <ModalCloseButton onClick={onCloseFollowersModal}>
                ×
              </ModalCloseButton>
            </ModalHeader>
            {followersList.length === 0 ? (
              <p
                style={{
                  color: "#6e767d",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No followers yet
              </p>
            ) : (
              <div>
                {followersList.map((user) => {
                  const initials =
                    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim() ||
                    "?";
                  return (
                    <Link
                      key={user.id}
                      to={`/users/${user.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={onCloseFollowersModal}
                    >
                      <ModalUserItem>
                        {user.avatarUrl ? (
                          <ModalUserAvatar
                            src={user.avatarUrl}
                            alt={user.firstName}
                          />
                        ) : (
                          <ModalUserAvatarPlaceholder $initials={initials}>
                            {initials}
                          </ModalUserAvatarPlaceholder>
                        )}
                        <ModalUserInfo>
                          <p
                            style={{
                              color: "#fff",
                              margin: 0,
                              fontWeight: 600,
                            }}
                          >
                            {user.firstName} {user.lastName}
                          </p>
                          <p
                            style={{
                              color: "#6e767d",
                              margin: 0,
                              fontSize: "14px",
                            }}
                          >
                            @{user.email?.split("@")[0] || "user"}
                          </p>
                        </ModalUserInfo>
                      </ModalUserItem>
                    </Link>
                  );
                })}
              </div>
            )}
          </ModalContent>
        </FollowingModal>
      )}
    </>
  );
}

ProfileView.propTypes = {
  profile: PropTypes.object.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  onEdit: PropTypes.func,
  onFollowChange: PropTypes.func,
  onSubscribeChange: PropTypes.func,
  onShowFollowing: PropTypes.func,
  onShowFollowers: PropTypes.func,
  followingList: PropTypes.array,
  followersList: PropTypes.array,
  showFollowingModal: PropTypes.bool,
  showFollowersModal: PropTypes.bool,
  onCloseFollowingModal: PropTypes.func,
  onCloseFollowersModal: PropTypes.func,
  userPosts: PropTypes.array,
  postsLoading: PropTypes.bool,
};
