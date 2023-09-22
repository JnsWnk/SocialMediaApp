import { useAppSelector } from "@./redux/hooks";
import { loggedIn } from "@./redux/slices/userSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = useAppSelector(loggedIn);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
