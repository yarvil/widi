import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authentication/authSelectors";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuthenticated);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PublicRoute;
