import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { loggedIn, logout } from "@./redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@./redux/hooks";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isLoggedIn = useAppSelector(loggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-row gap-5 my-4 items-end border-b border-0 justify-between">
      <div className="flex flex-row gap-5 items-end">
        <Link to={"/"} className="text-4xl font-semibold">
          Bomba
        </Link>
        <Link to={`/createPost`} className="text-2xl font-medium">
          New
        </Link>
      </div>
      <div className="flex flex-row items-end m-1 gap-2">
        {isLoggedIn ? (
          <>
            <Button>
              <Link to={"/profile"}> Profile </Link>
            </Button>
            <Button onClick={() => logoutUser()}> Log Out</Button>
          </>
        ) : (
          <Link to={`/login`} className="w-full h-full">
            <Button>Sign In</Button>
          </Link>
        )}
        <div>
          {theme == "dark" ? (
            <Button onClick={() => setTheme("light")}>
              {" "}
              <Sun />
            </Button>
          ) : (
            <Button onClick={() => setTheme("dark")}>
              {" "}
              <Moon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
