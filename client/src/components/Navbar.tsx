import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 my-4 text-white items-end border-b border-0">
      <Link to={"/"} className="text-4xl font-semibold">
        Bomba
      </Link>
      <Link to={`createPost`} className="text-2xl font-medium">
        New
      </Link>
    </div>
  );
};

export default Navbar;
