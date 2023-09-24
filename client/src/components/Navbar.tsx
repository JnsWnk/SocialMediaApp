import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { loggedIn, logout, userInfo } from "@./redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@./redux/hooks";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isLoggedIn = useAppSelector(loggedIn);
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-row gap-5 items-center border-b border-0 justify-between w-full px-28 backdrop-blur-lg py-3 mb-5 sticky top-0">
      <div className="flex flex-row gap-5 items-end">
        <Link to={"/"} className="text-4xl font-semibold">
          NanoBanano
        </Link>
      </div>
      <div className="flex flex-row items-end m-1 gap-2">
        {isLoggedIn ? (
          <div className="flex flex-row gap-2 items-end">
            <Link to={`/profile/${user?._id}`}>
              <img
                src={user?.image.image}
                alt="profile_icon"
                className="rounded-full w-10 h-10 object-contain border"
              />
            </Link>
            <Button onClick={() => logoutUser()}> Log Out</Button>
          </div>
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
