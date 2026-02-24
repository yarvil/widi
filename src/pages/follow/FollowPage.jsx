import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  clearSearchResults,
  searchUsersThunk,
} from "@/app/store/users/usersSlice";
import UserList from "@/shared/components/user/UserList/UserList";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "shared/ui/PageWrapper";

export const SearchWrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(47, 51, 54);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: rgb(231, 233, 234);
  background-color: transparent;
  border: 1px solid #2f3336;
  border-radius: 9999px;
  outline: none;

  &:focus {
    border-color: rgb(29, 155, 240);
  }

  &::placeholder {
    color: rgb(113, 118, 123);
  }
`;

export default function FollowPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchUsersThunk(searchQuery));
      } else {
        dispatch(clearSearchResults());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  return (
    <>
      <PageWrapper>
        <PageHeader title="Підписки" />
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Пошук користувачів..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>
        <UserList searchQuery={searchQuery} />
      </PageWrapper>
    </>
  );
}
