import { createBrowserRouter } from "react-router-dom";
import DynamicLayout from "../Components/Common/DynamicLayout";
import Error from "../Error/Error";

import Home from "../Home/Home";
import Register from "../Page/Register";
import Login from "../Page/Login";

import Student_Home from "../Pages/Student/Student_Home";
import Dashboard from "../Pages/Student/Dashboard";
import UserDashboard from "../Pages/Student/UserDashboard";

import AuthorityDashboard from "../Pages/Authority/AuthorityDashboard";
import ModeratorDashboard from "../Pages/Moderator/ModeratorDashboard";
import SuperAdminDashboard from "../Pages/Admin/SuperAdminDashboard";

import Unauthorized from "../Pages/Error/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../Layout/AdminLayout";
import ModeratorAuthorityLayout from "../Layout/ModeratorAuthorityLayout";
import Layout from "../Layout/Layout";
import Complaints from "../Pages/Admin/Complaints/Complaints";
import Notice from "../Pages/Student/Notice";
import AdminNotice from "../Pages/Admin/Adminnotice/AdminNotice";
import Accounts from "../Pages/Admin/Accounts/Accounts";
import AuthorityAcconts from "../Pages/Authority/AuthorityAcconts/AuthorityAcconts";
import About from "../Pages/Student/About";
import Contracts from "../Pages/Student/Contracts";

const AppRoutes = createBrowserRouter([

  {
    path: "/",
    element: <DynamicLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { 
  path: "complaints", 
  element: <ProtectedRoute allowedRoles={["user", "admin", "moderator", "authority"]}><Dashboard /></ProtectedRoute> 
},
      { path: "notice", element: <Notice/> },
       { path: "about", element: <About/> },
      { 
  path: "contact", 
  element: <ProtectedRoute allowedRoles={["user", "admin", "moderator", "authority"]}><Contracts /></ProtectedRoute> 
},

      {
        path: "user-dashboard",
        element: (
          <Layout>
            <UserDashboard />
          </Layout>
        ),
      },

      { path: "unauthorized", element: <Unauthorized /> },
    ],
  },

  
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "complaints", element: <Student_Home />  },
      { path: "admin_notice", element: <AdminNotice /> },
      {
        path: "accounts",
        element: <Accounts />,
      }
    ],
  },

  {
    path: "/moderator",
    element: (
      <ProtectedRoute allowedRoles={["moderator"]}>
        <ModeratorAuthorityLayout role="moderator" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ModeratorDashboard /> },
    ],
  },

  
  {
    path: "/authority",
    element: (
      <ProtectedRoute allowedRoles={["authority"]}>
        <ModeratorAuthorityLayout role="authority" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Student_Home /> },
      { path: "Dashboard", element: <AuthorityDashboard /> },
       { path: "notice", element: <AdminNotice /> },
       { path: "accounts", element: <AuthorityAcconts /> },
    ],
  },
]);

export default AppRoutes;
