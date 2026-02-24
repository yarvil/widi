import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { fetchUsersThunk } from "@/app/store/users/usersSlice";
import {
  selectSearchResults,
  selectUsers,
  selectUsersLoading,
} from "@/app/store/users/usersSelectors";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { selectFollowingStatus } from "@/app/store/follows/followsSelectors";
import UserCard from "../UserCard/UserCard";
import Loader from "@/app/store/authentication/Loader";

export const EmptyMessage = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: rgb(113, 118, 123);
  font-size: 15px;
`;

export default function UserList({ searchQuery = "" }) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isFollowing = useSelector(selectFollowingStatus);
  const currentUser = useSelector(selectCurrentUser);
  const searchResults = useSelector(selectSearchResults);
  const loading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(isFollowing).length > 0) {
      dispatch(fetchUsersThunk());
    }
  }, [isFollowing, dispatch]);

  const displayUsers = searchQuery ? searchResults : users;

  const filteredUsers = displayUsers.filter(
    (user) => user.id !== currentUser?.id,
  );

  if (loading && filteredUsers.length === 0) {
    return <Loader full={false} />;
  }

  if (filteredUsers.length === 0) {
    return (
      <EmptyMessage>
        {searchQuery
          ? `Нікого не знайдено за запитом "${searchQuery}"`
          : "Користувачів не знайдено"}
      </EmptyMessage>
    );
  }

  return (
    <>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
  );
}

UserList.propTypes = {
  searchQuery: PropTypes.string,
};
