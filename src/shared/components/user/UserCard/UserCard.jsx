import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { toggleFollowThunk } from "@/app/store/follows/followsSlice";
import { selectIsFollowing } from "@/app/store/follows/followsSelectors";
import Avatar from "@/shared/ui/Avatar/Avatar";
import Button from "@/shared/ui/Button/Button";
import {
  UserCardWrapper,
  UserFullName,
  UserInformation,
  Nickname,
  UserName,
  UserWrapper,
} from "./UserCard.styled";

export default function UserCard({
  avatarUrl,
  id,
  firstName,
  lastName,
  nickName,
  aboutMe,
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
      <UserWrapper>
        <UserInformation>
          <UserName>
            <UserFullName to={`/users/${id}`}>
              {firstName} {lastName}
            </UserFullName>
            <Nickname>@{nickName}</Nickname>
          </UserName>
          <Button
            variant={isFollowing ? "secondaryDanger" : "primary"}
            onClick={handleFollowClick}
          >
            {isFollowing ? (
              <>
                <span className="default-text">Підписки</span>
                <span className="hover-text">Не читати</span>
              </>
            ) : (
              "Читати"
            )}
          </Button>
        </UserInformation>
        <span>{aboutMe}</span>
      </UserWrapper>
    </UserCardWrapper>
  );
}

UserCard.propTypes = {
  id: PropTypes.string,
  nickName: PropTypes.string,
  avatarUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  aboutMe: PropTypes.string,
  following: PropTypes.bool,
  followersCount: PropTypes.number,
  postsCount: PropTypes.number,
};
