import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/Navber/AdminNavber";
import Footer from "../Components/Footer/Footer";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      
      <div className="p-4">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
