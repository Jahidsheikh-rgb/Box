import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <AuthProvider>
    <RouterProvider router={AppRoutes} />
  </AuthProvider>
);
