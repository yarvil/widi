import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../store/authentication/authSelectors";
import Loader from "../store/authentication/Loader";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return children;
};
export default PrivateRoute;
