import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Payment from "../Pages/Payment/Payment";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";

import PriceTrends from "../Pages/Dashboard/User/PriceTrends";
import RoleRoute from "../Pages/Dashboard/RoleRoute/RoleRoute";
import ManageWatchlist from "../Pages/Dashboard/User/ManageWatchlist";
import MyOrders from "../Pages/Dashboard/User/MyOrders";



export const router = createBrowserRouter([
  {
    path: "/", 
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'register',
            Component:Register
        },
        {
          path:'login',
          Component:Login

        },
        {
          path:'allproducts',
          Component:AllProducts,
          // loader:()=>fetch('http://localhost:3000/products')
        },
        {
          path:"products/:id",
          element:<PrivateRoute>
          <ProductDetails></ProductDetails>
          </PrivateRoute>,
          
        },
        {
          path:'payment/:id',
          Component:Payment
        }
        
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      

      // 🧑 User Routes
      {
        path: 'price-trends',
        element: (
          <RoleRoute allowedRoles={['user']}>
            <PriceTrends />
          </RoleRoute>
        ),
      },
      {
        path: 'watchlist',
        element: (
          <RoleRoute allowedRoles={['user']}>
            <ManageWatchlist />
          </RoleRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <RoleRoute allowedRoles={['user']}>
            <MyOrders />
          </RoleRoute>
        ),
      },

      // 🛒 Vendor and 👑 Admin routes will go here later
    ],
  },
]);
  