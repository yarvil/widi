import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersThunk } from "@/app/store/users/usersSlice";
import { selectUsers } from "@/app/store/users/usersSelectors";
import UserCard from "../UserCard/UserCard";
import { selectFollowingStatus } from "@/app/store/follows/followsSelectors";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";

export default function UserList() {
  const users = useSelector(selectUsers);
  const followingStatus = useSelector(selectFollowingStatus);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(followingStatus).length > 0) {
      dispatch(fetchUsersThunk());
    }
  }, [followingStatus, dispatch]);

  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  console.log(users);
  return (
    <>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
  );
}
