import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors"
import Classes from "../pages/Classes/Classes"
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import UserSelectClass from "../pages/Dashboard/UserSelectClass/UserSelectClass";
import Payment from "../pages/Dashboard/Payment/Payment";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import PrivateRoute from "../Routes/PrivateRoute" 
import AdminRoute from "./AdminRoute";
import InstructorsRoute from "./InstructorsRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "instructors",
          element: <Instructors></Instructors>
        },
        {
          path: "classes",
          element: <Classes></Classes>
        },
        // {
        //   path: "dashboard ",
        //   element: <Classes></Classes>
        // },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "signup",
          element: <SignUp></SignUp>
        },
      ],
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: "manageusers",
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: "manageclasses",
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: "addclasses",
          element: <InstructorsRoute><AddClass></AddClass></InstructorsRoute>
        },
        {
          path: "myclasses",
          element: <InstructorsRoute><MyClasses></MyClasses></InstructorsRoute>
        },
        {
          path: "selectClasses",
          element: <UserSelectClass></UserSelectClass>
        },
        {
          path: "payment/:id",
          element: <Payment></Payment>
        }
      ]
    }
]);

 