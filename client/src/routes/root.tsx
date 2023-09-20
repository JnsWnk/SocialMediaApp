import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen px-28">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}
