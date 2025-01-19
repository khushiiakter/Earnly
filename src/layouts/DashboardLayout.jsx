import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBell } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, coins  } = useContext(AuthContext);
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-60">
        <div className="border flex items-center justify-end text-right px-8">
          <div>
            <h2 className="font-bold  text-xl">Available coin  {coins} </h2>
            <h2 className="flex gap-2 items-center">
              {user.role} | {user?.displayName} <span className="font-normal text-base"><FaBell></FaBell></span>
            </h2>
          </div>
          <div className=" md:block">
            <img
              src={user?.photoURL}
              // alt="Profile"
              className="border-2 border-[#e3e5f3d5] w-11 h-11 rounded-full object-cover cursor-pointer ml-4"
            />
            
          </div>
        </div>

        <div className="p-5 min-h-[calc(100vh-68px)] border">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
        <div className="h-28 border">footer</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
