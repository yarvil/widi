import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authentication/authSelectors";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuthenticated);

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return children;
};
export default PrivateRoute;
