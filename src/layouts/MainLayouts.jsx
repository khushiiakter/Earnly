import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Shared/Navbar";

const MainLayouts = () => {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayouts;
