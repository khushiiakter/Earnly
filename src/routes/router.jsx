import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";

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
        

        // {
        //   path: "/services",
        //   element: <Services></Services>,
        //   loader: () => fetch('https://assignment-11-server-nine-peach.vercel.app/services')
        // },
        // {
        //   path: "/my-services",
        //   element: <MyServices></MyServices>,
        
        // },
        // {
        //   path: "/add-service",
        
        //   element:<PrivateRoute><AddService></AddService></PrivateRoute> ,
        // },
        // {
        //   path: "/update-service",
        //   element:<PrivateRoute><UpdateService></UpdateService></PrivateRoute> ,
        // },
        // {
        //   path: "/myReviews",
        //   element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute> ,
         
        // },
        
        // {
        //   path: "/service-details/:id",
        //   element:<PrivateRoute><ServiceDetail></ServiceDetail></PrivateRoute> ,
        //   loader: ({params}) => fetch(`https://assignment-11-server-nine-peach.vercel.app/services/${params.id}`),

             
          
        // },
        // {
        //   path: "/membership",
        //   element: <Membership></Membership> ,
         
          
        // },
        
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
        // {
        //   path: 'userHome',
        //   element: <UserHome></UserHome>
        // },
        // {
        //   path: 'cart',
        //   element: <Cart></Cart>
        // },
        // {
        //   path: 'payment',
        //   element: <Payment></Payment>
        // },
        // {
        //   path: 'paymentHistory',
        //   element: <PaymentHistory></PaymentHistory>
        // },

        // admin only routes
        // {
        //   path: 'adminHome',
        //   element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        // },
        // {
        //   path: 'addItems',
        //   element: <AdminRoute><AddItems></AddItems></AdminRoute>
        // },
        // {
        //   path: 'manageItems',
        //   element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        // },
        // {
        //   path: 'updateItem/:id',
        //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        //   loader: ({params}) => fetch(`https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`)
        // },
        // {
        //   path: 'users',
        //   element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        // }

      ]
    }
  ]);
export default router;