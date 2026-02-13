import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/app/store/authentication/authSelectors";
import HeaderMenu from "./HeaderMenu";
import { NavLink } from "react-router-dom";
export default function Header() {
  const isAuth = useSelector(selectIsAuthenticated);

  return <>{isAuth ? <HeaderMenu /> : <NavLink to="/auth"> </NavLink>}</>;
}
