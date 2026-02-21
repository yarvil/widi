import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { toggleFollowThunk } from "@/app/store/follows/followsSlice";
import { selectIsFollowing } from "@/app/store/follows/followsSelectors";
import Avatar from "@/shared/ui/Avatar/Avatar";
import {
  UserCardWrapper,
  UserFullName,
  Counters,
  UserInformation,
} from "./UserCard.styled";
import Button from "@/shared/ui/Button/Button";

export default function UserCard({
  avatarUrl,
  id,
  firstName,
  lastName,
  followersCount,
  postsCount,
  following: initialIsFollowing,
}) {
  const dispatch = useDispatch();

  const followStatusFromStore = useSelector(selectIsFollowing(id));
  const isFollowing = followStatusFromStore ?? initialIsFollowing;

  const handleFollowClick = () => {
    dispatch(toggleFollowThunk({ userId: id, isFollowing }));
  };

  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.trim() || "?";

  return (
    <UserCardWrapper>
      <Avatar
        src={avatarUrl}
        alt={firstName}
        initials={initials}
        size={50}
        linkTo={`/users/${id}`}
      />
      <UserInformation>
        <div>
          <Link to={`/users/${id}`}>
            <UserFullName>
              {firstName} {lastName}
            </UserFullName>
          </Link>
          <Counters>Підписники: {followersCount}</Counters>
          <Counters>Пости: {postsCount}</Counters>
        </div>
        <div>
          <Button
            variant={isFollowing ? "secondaryDanger" : "primary"}
            onClick={handleFollowClick}
          >
            {isFollowing ? (
              <>
                <span className="default-text">Підписки</span>
                <span className="hover-text">Відписатись</span>
              </>
            ) : (
              "Підписатись"
            )}
          </Button>
        </div>
      </UserInformation>
    </UserCardWrapper>
  );
}

UserCard.propTypes = {
  id: PropTypes.string,
  // username: PropTypes.string,
  avatarUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  following: PropTypes.bool,
  followersCount: PropTypes.number,
  postsCount: PropTypes.number,
};
