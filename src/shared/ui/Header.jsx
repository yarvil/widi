import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/">Home page</NavLink>
      <NavLink to="/users/:id">User page</NavLink>
      <NavLink to="/auth">Login page</NavLink>
      <NavLink to="/chat">Chat</NavLink>
    </header>
  );
}
