// src/layouts/ModeratorAuthorityLayout.jsx
import { Outlet } from "react-router-dom";
import ModeratorAuthorityNavbar from "../Components/Navber/ModeratorAuthorityNavbar";

export default function ModeratorAuthorityLayout({ role, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <ModeratorAuthorityNavbar role={role} />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Render children if provided, otherwise use <Outlet /> for nested routes */}
        {children ? children : <Outlet/>}
      </main>
    </div>
  );
}
