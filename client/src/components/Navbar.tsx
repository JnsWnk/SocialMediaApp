import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-row gap-5 my-4 text-white items-end border-b border-0 justify-between">
      <div className="flex flex-row gap-5 items-end">
        <Link to={"/"} className="text-4xl font-semibold">
          Bomba
        </Link>
        <Link to={`/createPost`} className="text-2xl font-medium">
          New
        </Link>
      </div>
      <div className="flex flex-row items-end m-1 gap-2">
        <Link
          to={`/login`}
          className="border rounded-md p-2 hover:bg-slate-800"
        >
          Sign In
        </Link>
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
