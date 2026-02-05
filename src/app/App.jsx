import { AppRouter } from "@/app/router";
import Header from "@/shared/ui/Header";
import StatusMessage from "./store/authentication/StatusMessage";
import { checkAuth } from "./store/authentication/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("checkAuth");
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {/* <Header /> */}
      <AppRouter />
      <StatusMessage />
    </>
  );
}

export default App;
