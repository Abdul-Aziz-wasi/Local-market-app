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
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct";
import MyProducts from "../Pages/Dashboard/Vendor/MyProducts";
import UpdateProduct from "../Pages/Dashboard/Vendor/UpdateProduct";
import AddAdvertisement from "../Pages/Dashboard/Vendor/AddAdvertisement";
import MyAdvertisements from "../Pages/Dashboard/Vendor/MyAdvertisements";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllProduct from "../Pages/Dashboard/Admin/AllProduct";
import AllAdvertisements from "../Pages/Dashboard/Admin/AllAdvertisements";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import TermsAndConditions from "../Components/TermsAndConditions";
import PrivacyPolicy from "../Components/PrivacyPolicy";



export const router = createBrowserRouter([
  {
    path: "/", 
    Component:RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
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
        },
        {
          path:'terms',
          Component:TermsAndConditions

        },
        {
          path:'privacy',
          Component:PrivacyPolicy
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

      

      // 🛒 Vendor routes

      {
      path: 'add-product',
      element: (
        <RoleRoute allowedRoles={['vendor']}>
          <AddProduct />
        </RoleRoute>
      ),
    },
    {
      path: 'my-products',
      element: (
        <RoleRoute allowedRoles={['vendor']}>
          <MyProducts />
        </RoleRoute>
      ),
    },
    {
      path:"/dashboard/update-product/:id",
      Component:UpdateProduct
    },
    {
      path: 'add-advertisement',
      element: (
        <RoleRoute allowedRoles={['vendor']}>
          <AddAdvertisement />
        </RoleRoute>
      ),
    },
    {
      path: 'my-advertisements',
      element: (
        <RoleRoute allowedRoles={['vendor']}>
          <MyAdvertisements />
        </RoleRoute>
      ),
    },
     {
        path: "all-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllUsers />
          </RoleRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllProduct />
          </RoleRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllAdvertisements />
          </RoleRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllOrders />
          </RoleRoute>
        ),
      },
    ],
  },
]);
  