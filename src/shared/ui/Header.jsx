import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/">Home page</NavLink>
      <NavLink to="/users/:id">User page</NavLink>
      <NavLink to="/login">Login page</NavLink>
    </header>
  );
}
