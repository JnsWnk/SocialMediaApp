import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 px-28">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
