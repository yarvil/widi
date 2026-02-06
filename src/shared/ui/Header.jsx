
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


// import { NavLink } from "react-router-dom";
// import "./Header.scss";

// export default function Header() {
//   return (
//     <header className="header">
//       <NavLink to="/">Home page</NavLink>
//       <NavLink to="/users/:id">User page</NavLink>
//       <NavLink to="/auth">Login page</NavLink>
//     </header>
//   );
// }
