import { Link, Outlet } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars, FaBell, FaHome } from "react-icons/fa";
import useAdmin from "../components/hooks/useAdmin";
import useBuyer from "../components/hooks/useBuyer";
import DashboardFooter from "../components/Shared/DashboardFooter";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const { user, coins } = useContext(AuthContext);

  const [isAdmin] = useAdmin();
  const [isBuyer] = useBuyer();
  const isWorker = !isBuyer && !isAdmin;

  // const [tasks, setTasks] = useState([]);
  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>Dashboard - Earnly</title>
      </Helmet>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col ">
        <div className="border w-full flex items-center justify-between md:justify-end text-right px-8">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <FaBars></FaBars>
          </label>
          <div className="flex items-center justify-end">
            <div>
              <h2 className="font-bold  ">
                Available coins <span className="text-xl">{coins}</span>{" "}
              </h2>
              <h2 className="flex gap-2 items-center">
                {user.role} | {user?.displayName}{" "}
                <span className="font-normal text-base">
                  <FaBell></FaBell>
                </span>
              </h2>
            </div>
            <div className=" md:block">
              <img
                src={user?.photoURL}
                className="border-2 border-[#e3e5f3d5] w-11 h-11 rounded-full object-cover cursor-pointer ml-4"
              />
            </div>
          </div>
        </div>
        <div className="p-5 min-h-screen">
          <Outlet></Outlet>
        </div>
        <DashboardFooter></DashboardFooter>
      </div>

      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 font-medium text-lg  p-4 space-y-2 min-h-full w-64 ">
          {/* Sidebar content here */}
          <Link
            to="/"
            className="flex justify-center border-b-2 pb-1.5 items-center md:gap-1 "
          >
            {/* <img src={logo} className="h-7 md:block hidden" alt="" /> */}
            <p className="md:text-2xl text-lg font-bold">Earnly</p>
          </Link>
          {isAdmin && (
            <>
              <li>
                <Link to="/dashboard/adminHome">Admin Home</Link>
              </li>
              <li>
                <Link to="/dashboard/tasks">TaskList</Link>
              </li>
              <li>
                <Link to="/dashboard/manageUsers">Manage Users</Link>
              </li>
              <li>
                <Link to="/dashboard/manageTasks">Manage Task</Link>
              </li>
            </>
          )}

          {isBuyer && (
            <>
              <li>
                <Link to="/dashboard/buyerHome">Buyer Home</Link>
              </li>
              <li>
                <Link to="/dashboard/addNewTasks">Add new Tasks</Link>
              </li>
              <li>
                <Link to="/dashboard/myTasks">My Task's</Link>
              </li>
              <li>
                <Link to="/dashboard/tasks">TaskList</Link>
              </li>
              <li>
                <Link to="/dashboard/purchaseCoin">Purchase Coin</Link>
              </li>
              <li>
                <Link to="/dashboard/paymentHistory">Payment history</Link>
              </li>
            </>
          )}

          {isWorker && (
            <>
              <li>
                <Link to="/dashboard/workerHome">Worker Home</Link>
              </li>
              <li>
                <Link to="/dashboard/tasks">TaskList</Link>
              </li>
              <li>
                <Link to="/dashboard/mySubmissions">My Submissions</Link>
              </li>
              <li>
                <Link to="/dashboard/withdrawals">Withdrawals</Link>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <Link to="/">
              <FaHome></FaHome>
              <span className="mx-4 font-medium">Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
