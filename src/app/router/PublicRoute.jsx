import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../store/authentication/authSelectors";
import Loader from "../../shared/components/Loader";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return <Loader />;
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PublicRoute;
