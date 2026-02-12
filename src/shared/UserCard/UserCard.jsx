import { Link } from "react-router-dom";
import { Avatar, AvatarWrapper } from "../post/PostCard/PostCard.styled";
import {
  FollowButton,
  UserCardWrapper,
  UserFullName,
  UserId,
  UserInformation,
} from "./UserCard.styled";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollowThunk } from "@/app/store/follows/followsSlice";
import { selectIsFollowing } from "@/app/store/follows/followsSelectors";

export default function UserCard({
  avatarUrl,
  id,
  firstName,
  lastName,
  following: initialIsFollowing,
}) {
  const dispatch = useDispatch();

  const followStatusFromStore = useSelector(selectIsFollowing(id));
  const isFollowing = followStatusFromStore ?? initialIsFollowing;

  // console.log("UserCard render:", {
  //   id,
  //   followStatusFromStore,
  //   initialIsFollowing,
  //   isFollowing,
  // });

  const handleFollowClick = () => {
    // console.log("Button clicked! Dispatching:", { userId: id, isFollowing });
    dispatch(toggleFollowThunk({ userId: id, isFollowing }));
  };

  return (
    <UserCardWrapper>
      <AvatarWrapper>
        <Link style={{ display: "flex", padding: "4px" }} to={`/users/${id}`}>
          <Avatar src={avatarUrl} />
        </Link>
      </AvatarWrapper>
      <UserInformation>
        <div>
          <Link to={`/users/${id}`}>
            <UserFullName>
              {firstName} {lastName}
            </UserFullName>
          </Link>
          <UserId>@{id}</UserId>
        </div>
        <div>
          <FollowButton onClick={handleFollowClick}>
            {isFollowing ? "Unfollow" : "Follow"}
          </FollowButton>
        </div>
      </UserInformation>
    </UserCardWrapper>
  );
}

UserCard.propTypes = {
  id: PropTypes.string,
  avatarUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  following: PropTypes.bool,
};
