import { AppRouter } from "@/app/router";
import Header from "@/shared/ui/Header";
import StatusMessage from "./store/authentication/StatusMessage";
import { checkAuth } from "./store/authentication/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/authentication/authSelectors";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      dispatch(checkAuth());
    }
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
