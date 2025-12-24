import Counter from "./ui/Counter";
import TestButton from "./ui/TestButton";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/authentication/authSlice";
import { Button } from "../auth/ui";

export default function FeedPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <h2>Here will be feed</h2>
      <p>Лічильник для прикладу роботи редакса</p>
      <Counter />
      <TestButton />
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
