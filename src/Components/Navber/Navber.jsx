import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Ensure correct path
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const menuItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/complaints">Add Complaints</NavLink></li>
      <li><NavLink to="/notice">Notice</NavLink></li>
      <li><NavLink to="/about">About us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl font-bold text-green-600">
          UniBox
        </NavLink>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {menuItems}
        </ul>
      </div>

      {/* RIGHT - Conditional Rendering */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full border-2 border-green-500">
                <img 
                  src={user?.photoURL || user?.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                  alt="User Profile" 
                />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
              <li className="px-4 py-2 border-bottom font-semibold text-gray-700">
                {user?.displayName || user?.name || "User"}
              </li>
              <div className="divider my-0"></div>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li><NavLink to="/user-dashboard">Dashboard</NavLink></li>
              <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50">Logout</button></li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-success text-white px-6 rounded-full shadow-md">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;