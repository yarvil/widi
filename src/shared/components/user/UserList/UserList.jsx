import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersThunk } from "@/app/store/users/usersSlice";
import { selectUsers } from "@/app/store/users/usersSelectors";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { selectFollowingStatus } from "@/app/store/follows/followsSelectors";
import UserCard from "../UserCard/UserCard";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isFollowing = useSelector(selectFollowingStatus);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(isFollowing).length > 0) {
      dispatch(fetchUsersThunk());
    }
  }, [isFollowing, dispatch]);

  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  return (
    <>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
  );
}
