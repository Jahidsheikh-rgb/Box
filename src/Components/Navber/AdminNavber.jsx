import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
 

const AdminNavbar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    console.count("🔥 AdminNavbar mounted");
  }, []);

  const menuItems = (
  <>
    <li>
      <NavLink
        to="/admin"
        // className={({ isActive }) =>
        //   isActive ? "text-yellow-400 font-bold" : ""
        //}
      >
        Dashboard
      </NavLink>
    </li>

    <li>
      <NavLink to="/admin/complaints">Complaints</NavLink>
    </li>

    <li>
      <NavLink to="/admin/accounts">Accounts</NavLink>
    </li>

    <li>
      <NavLink to="/admin/admin_notice">Notice</NavLink>
    </li>

    <li>
      <NavLink to="/admin/settings">Settings</NavLink>
    </li>
  </>
);


  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          {/* Mobile menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl font-bold">
          UniBox
        </NavLink>
      </div>

      {/* CENTER (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>

      {/* RIGHT (Optional, you can remove if logout is in menu) */}
      <div className="navbar-end hidden lg:flex">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="btn btn-error"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
