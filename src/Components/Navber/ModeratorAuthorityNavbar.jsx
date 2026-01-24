import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const ModeratorAuthorityNavbar = ({ role }) => {
  const { logoutUser, user } = useAuth();
  const navigate = useNavigate();

  // Unified logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const label = role === "moderator" ? "Moderator Panel" : "Authority Panel";
  const activeClass = "bg-green-600 text-white font-bold px-4 py-2 rounded-lg";

  const navLinks = role === "moderator"
    ? [
        { name: "Home", path: "/moderator" },
        { name: "Users", path: "/moderator/users" },
        { name: "Reports", path: "/moderator/reports" },
      ]
    : [
        { name: "Box", path: "/authority" },
        { name: "Dashboard", path: "/authority/Dashboard" },
        { name: "Notice", path: "/authority/notice" },
        { name: "Accounts", path: "/authority/accounts" },
        { name: "Chat", path: "/authority/Chat" },
      ];

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
      {/* LEFT: Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
            <li className="menu-title text-green-600">{label}</li>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
            <div className="divider my-1"></div>
            <li>
              <button onClick={handleLogout} className="btn btn-error btn-sm text-white">Logout</button>
            </li>
          </ul>
        </div>

        <NavLink to="/" className="flex flex-col items-start gap-0">
          <span className="text-xl font-bold text-green-700">UniBox</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 -mt-1">{label}</span>
        </NavLink>
      </div>

      {/* CENTER: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) => (isActive ? activeClass : "hover:text-green-600")}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: User Info & Logout */}
      <div className="navbar-end gap-4">
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-gray-400 leading-none mb-1 uppercase">{role}</p>
          <p className="text-sm font-semibold leading-none">{user?.displayName || user?.name || "Member"}</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="btn btn-error btn-sm hidden lg:flex"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ModeratorAuthorityNavbar;