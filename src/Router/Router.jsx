import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import AllProducts from "../Pages/AllProducts/AllProducts";
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
          path:"/products/:id",
          element:<PrivateRoute>
          <ProductDetails></ProductDetails>
          </PrivateRoute>,
          
        },
        
    ]
  },
]);
  