import { Link, Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBell, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, coins } = useContext(AuthContext);

  const isAdmin = true;
  const isBuyer = false;
  const isWorker = false;
  // const [tasks, setTasks] = useState([]);
  return (
    // <div className="relative min-h-screen md:flex bg-white">

    //   <Sidebar></Sidebar>

    //   <div className="flex-1 md:ml-60">
    //     <div className="border flex items-center justify-end text-right px-8">
    //       <div>
    //         <h2 className="font-bold  text-xl">Available coin  {coins} </h2>
    //         <h2 className="flex gap-2 items-center">
    //           {user.role} | {user?.displayName} <span className="font-normal text-base"><FaBell></FaBell></span>
    //         </h2>
    //       </div>
    //       <div className=" md:block">
    //         <img
    //           src={user?.photoURL}

    //           className="border-2 border-[#e3e5f3d5] w-11 h-11 rounded-full object-cover cursor-pointer ml-4"
    //         />

    //       </div>
    //     </div>

    //     <div className="p-5 min-h-[calc(100vh-68px)] border">

    //       <Outlet />
    //     </div>
    //     <div className="h-28 border">footer</div>
    //   </div>
    // </div>

    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col ">
        <div className="border w-full flex items-center justify-end text-right px-8">
          <div>
            <h2 className="font-bold  text-xl">Available coin {coins} </h2>
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
        <div className="p-5 min-h-screen">
          <Outlet></Outlet>
        </div>

        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>

      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 font-medium text-lg  p-4 space-y-2 min-h-full w-64 ">
          {/* Sidebar content here */}
          {isAdmin && (
            <>
              <li>
                <Link to="/dashboard/adminHome">Admin Home</Link>
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
          
          <hr />

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
