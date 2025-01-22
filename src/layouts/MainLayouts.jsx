import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayouts = () => {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer></Footer>
      <Toaster />
    </div>
  );
};

export default MainLayouts;
