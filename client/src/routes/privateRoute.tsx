import { useAppSelector } from "@./redux/hooks";
import { loggedIn } from "@./redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = useAppSelector(loggedIn);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
};

export default PrivateRoute;
