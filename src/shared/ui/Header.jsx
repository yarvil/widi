
import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/app/store/authentication/authSelectors";
import AuthMenu from "./AuthMenu";
import GuestMenu from "./GuestMenu";
export default function Header() {
const isAuth = useSelector(selectIsAuthenticated)

  return (
    <>
      {isAuth ? <AuthMenu /> : <GuestMenu />}
    </>
  );
}

