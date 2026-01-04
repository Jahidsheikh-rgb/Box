
import { createBrowserRouter } from "react-router-dom";
import Error from "../Error/Error";
import Layout from "../Layout/Layout";
import Student_Home from "../Pages/Student/Student_Home";
import Dashboard from "../Pages/Student/Dashboard";
import Register from "../Page/Register";
import Login from "../Page/Login";
import Notice from "../Pages/Student/Notice";


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Student_Home/>,
      },{
        path:"/complaints",
        element:<Dashboard/>
      },{
        path:"/register",
        element:<Register/>
      },{
    path: "/login",
    element:<Login/>
  },{
    path:"/notice",
    element:<Notice/>
  }
     
    
    
    ],
  },
]);

export default AppRoutes;


 


