import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import WorkerHome from "../Pages/worker/WorkerHome";
import TaskList from "../Pages/worker/TaskList";
import MySubmissions from "../Pages/worker/MySubmissions";
import Withdrawals from "../Pages/worker/Withdrawals";
import BuyerHome from "../Pages/Buyer/BuyerHome";
import AddNewTasks from "../Pages/Buyer/AddNewTasks";
import MyTasks from "../Pages/Buyer/MyTasks";
import PurchaseCoin from "../Pages/Buyer/PurchaseCoin";
import PaymentHistory from "../Pages/Buyer/PaymentHistory";
import AdminHome from "../Pages/Admin/AdminHome";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageTasks from "../Pages/Admin/ManageTasks";
import TaskDetail from "../components/TaskDetail";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
    //   errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>
      
        },
        {
            path: "/available-coin",
            element: <h2>Available coin</h2>,
          
          },
      
        {
          path: "/auth",
          element: <AuthLayouts></AuthLayouts>,
          children: [
            {
              path: "/auth/login",
              element: <Login></Login>
            },
            {
              path: "/auth/register",
              element: <Register></Register>,
            },
          ]
        }
        
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'workerHome',
          element: <WorkerHome></WorkerHome>,
          
        },
        {
          path: 'tasks',
          element: <TaskList></TaskList>,
          loader: () => fetch('https://earnly-server.vercel.app/tasks'),
        },
        {
          path: "task-details/:id",
          element:<PrivateRoute><TaskDetail></TaskDetail></PrivateRoute> ,
          loader: ({params}) => fetch(`https://earnly-server.vercel.app/tasks/${params.id}`),

             
          
        },
        {
          path: 'mySubmissions',
          element: <MySubmissions></MySubmissions>
        },
        
        {
          path: 'withdrawals',
          element: <Withdrawals></Withdrawals>,
        },
        {
          path: 'buyerHome',
          element: <BuyerHome></BuyerHome>
        },
        {
          path: 'addNewTasks',
          element: <AddNewTasks></AddNewTasks>,
        },
        {
          path: 'myTasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: 'purchaseCoin',
          element: <PurchaseCoin></PurchaseCoin>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: 'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute> ,
        },
        {
          path: 'manageUsers',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute> ,
        },
        {
          path: 'manageTasks',
          element:<AdminRoute><ManageTasks></ManageTasks></AdminRoute> 
        },

       

      ]
    }
  ]);
export default router;