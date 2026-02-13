import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppRouter } from "@/app/router";
import Header from "@/shared/ui/Header/Header";
import StatusMessage from "./store/authentication/StatusMessage";
import { checkAuth } from "./store/authentication/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Header />
      <AppRouter />
      <StatusMessage />
    </>
  );
}

export default App;
