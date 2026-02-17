import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserByIdThunk } from "@/app/store/users/usersSlice";
import { selectCurrentProfile } from "@/app/store/users/usersSelectors";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import {
  selectFeedPosts,
  selectMyFeedPosts,
} from "@/app/store/posts/postsSelectors";
import {
  checkFollowStatus,
  getMyFollowing,
  getMyFollowers,
} from "@/api/follows";
import { fetchGet } from "@/pages/auth/sendRequest";
import { fetchUserPosts } from "@/api/posts";

import PageWrapper from "@/shared/ui/PageWrapper";
import ProfileView from "./components/ProfileView/ProfileView";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import Loader from "@/app/store/authentication/Loader";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const profile = useSelector(selectCurrentProfile);
  const feedPosts = useSelector(selectFeedPosts);
  const myFeedPosts = useSelector(selectMyFeedPosts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const isOwnProfile = !id || (profile && currentUser?.id === profile.id);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const userId = id || currentUser?.id;
        if (!userId) {
          navigate("/");
          return;
        }

        const loadedProfile = await dispatch(
          fetchUserByIdThunk(userId),
        ).unwrap();
        const isOtherUser = loadedProfile.id !== currentUser?.id;

        if (isOtherUser) {
          try {
            const followStatus = await checkFollowStatus(userId);
            setIsFollowing(followStatus || false);

            const subscriptionKey = `notification_subscription_${userId}`;
            const savedSubscriptionStatus =
              localStorage.getItem(subscriptionKey);

            let initialSubscribed;
            if (savedSubscriptionStatus !== null) {
              initialSubscribed = savedSubscriptionStatus === "true";
            } else {
              initialSubscribed = followStatus || false;
              localStorage.setItem(subscriptionKey, String(initialSubscribed));
            }

            setIsSubscribed(initialSubscribed);
          } catch (err) {
            console.error("Failed to check follow status", err);
            setIsFollowing(false);
            setIsSubscribed(false);
          }
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, currentUser?.id, dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      const loadLists = async () => {
        try {
          if (currentUser?.id === profile.id) {
            const [following, followers] = await Promise.all([
              getMyFollowing(),
              getMyFollowers(),
            ]);
            setFollowingList(following || []);
            setFollowersList(followers || []);
          } else if (id) {
            const [following, followers] = await Promise.all([
              fetchGet(`api/follow/${id}/following`),
              fetchGet(`api/follow/${id}/followers`),
            ]);
            setFollowingList(following || []);
            setFollowersList(followers || []);
          }
        } catch (error) {
          console.error("Failed to load lists", error);
        }
      };
      loadLists();
    }
  }, [profile, currentUser?.id, id]);

  useEffect(() => {
    if (profile) {
      const loadUserPosts = async () => {
        setPostsLoading(true);
        try {
          const userId = profile.id;
          const response = await fetchUserPosts(userId, 0, 20);
          const postsArray = Array.isArray(response)
            ? response
            : response?.content || [];
          const normalizedPosts = postsArray.map((post) => ({
            postId: post.id,
            createdTime: post.createdAt,
            authorId: post.author?.id || userId,
            name:
              `${post.author?.firstName || profile.firstName || ""} ${post.author?.lastName || profile.lastName || ""}`.trim() ||
              profile.email?.split("@")[0] ||
              "User",
            avatar: post.author?.avatarUrl || profile.avatarUrl,
            text: post.content,
            media: post.imageUrl,
            likesCount: post.likesCount || 0,
            commentsCount: post.commentsCount || 0,
            repostsCount: post.repostsCount || 0,
            quotesCount: post.quotesCount || 0,
            liked: post.liked || false,
            saved: post.saved || false,
            isFollowing: post.author?.isFollowing || false,
          }));
          setUserPosts(normalizedPosts);
        } catch (error) {
          console.error("Failed to load user posts", error);
          setUserPosts([]);
        } finally {
          setPostsLoading(false);
        }
      };
      loadUserPosts();
    }
  }, [profile]);

  useEffect(() => {
    if (userPosts.length > 0) {
      const allReduxPosts = [...feedPosts, ...myFeedPosts];

      setUserPosts((prevPosts) =>
        prevPosts.map((post) => {
          const updatedPost = allReduxPosts.find(
            (p) => p.postId === post.postId,
          );
          if (updatedPost) {
            return {
              ...post,
              liked: updatedPost.liked,
              saved: updatedPost.saved,
              likesCount: updatedPost.likesCount,
              commentsCount: updatedPost.commentsCount,
              repostsCount: updatedPost.repostsCount,
              quotesCount: updatedPost.quotesCount,
            };
          }
          return post;
        }),
      );
    }
  }, [feedPosts, myFeedPosts]);

  if (loading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  if (!profile) {
    return (
      <PageWrapper>
        <div style={{ padding: "20px", color: "#fff", textAlign: "center" }}>
          Profile not found
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {isEditMode && isOwnProfile ? (
        <ProfileEdit
          profile={profile}
          onCancel={() => setIsEditMode(false)}
          onSave={async () => {
            setIsEditMode(false);
            const userId = id || currentUser?.id;
            if (userId) {
              await dispatch(fetchUserByIdThunk(userId));
            }
          }}
        />
      ) : (
        <ProfileView
          profile={profile}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          isSubscribed={isSubscribed}
          onEdit={() => setIsEditMode(true)}
          onFollowChange={(newStatus) => {
            setIsFollowing(newStatus);
            if (!newStatus) {
              const subscriptionKey = `notification_subscription_${profile.id}`;
              localStorage.removeItem(subscriptionKey);
              setIsSubscribed(false);
            } else {
              const subscriptionKey = `notification_subscription_${profile.id}`;
              localStorage.setItem(subscriptionKey, "true");
              setIsSubscribed(true);
            }
          }}
          onSubscribeChange={(newStatus) => {
            setIsSubscribed(newStatus);
            const subscriptionKey = `notification_subscription_${profile.id}`;
            localStorage.setItem(subscriptionKey, String(newStatus));
          }}
          onShowFollowing={() => setShowFollowingModal(true)}
          onShowFollowers={() => setShowFollowersModal(true)}
          followingList={followingList}
          followersList={followersList}
          showFollowingModal={showFollowingModal}
          showFollowersModal={showFollowersModal}
          onCloseFollowingModal={() => setShowFollowingModal(false)}
          onCloseFollowersModal={() => setShowFollowersModal(false)}
          userPosts={userPosts}
          postsLoading={postsLoading}
        />
      )}
    </PageWrapper>
  );
}
