// import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { Link } from "react-router-dom";


// import { GrLogout } from "react-icons/gr";
// import { FaHome } from "react-icons/fa";
// import { AiOutlineBars } from "react-icons/ai";

// const Sidebar = () => {
//   const { logOut } = useContext(AuthContext);
//   const [isActive, setActive] = useState(false);

  
//   const handleToggle = () => {
//     setActive(!isActive);
//   };
//   return (
//     <>
     
//       <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
//         <div>
//           <div className="block cursor-pointer p-4 font-bold">
//             <Link to="/">
//               <img
               
//                 src="https://i.ibb.co/4ZXzmq5/logo.png"
//                 alt="logo"
//                 width="100"
//                 height="100"
//               />
//             </Link>
//           </div>
//         </div>

//         <button
//           onClick={handleToggle}
//           className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
//         >
//           <AiOutlineBars className="h-5 w-5" />
//         </button>
//       </div>

      
//       <div
//         className={`md:z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-60 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
//           isActive && "-translate-x-full"
//         }  md:translate-x-0  transition duration-200 ease-in-out`}
//       >
//         <div>
//           <div>
//             <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
//               <Link to="/">
//                 <img
//                   className='hidden md:block'
//                   src=""
//                   alt="logo"
//                 />
//               </Link>
//             </div>
//           </div>

//           {/* Nav Items */}
//           <div className="flex flex-col justify-between flex-1 mt-6">
//             <ul className="menu p-4 space-y-2">
              
//               <li>
//                 <Link to="/dashboard/workerHome">Worker Home</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/tasks">TaskList</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/mySubmissions">My Submissions</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/withdrawals">Withdrawals</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/buyerHome">Buyer Home</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/addNewTasks">Add new Tasks</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/myTasks">My Task's</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/purchaseCoin">Purchase Coin</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/paymentHistory">Payment history</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/adminHome">Admin Home</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/manageUsers">Manage Users</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/manageTasks">Manage Task</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div>
//           <hr />

//           <li>
//             <Link to="/">
//               <FaHome></FaHome>
//               <span className="mx-4 font-medium">Home</span>
//             </Link>
//           </li>
//           <button
//             onClick={logOut}
//             className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
//           >
//             <GrLogout className="w-5 h-5" />

//             <span className="mx-4 font-medium">Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
