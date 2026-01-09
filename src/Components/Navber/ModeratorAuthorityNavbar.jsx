import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ModeratorAuthorityNavbar = ({ role }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const color = role === "moderator" ? "navbar bg-base-100 " : "navbar bg-base-100";
  const label = role === "moderator" ? "Moderator" : "Authority";

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
    <div className={`navbar ${color} shadow-md px-4`}>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
            <li>
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
            </li>
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl font-bold">
          UniBox
        </NavLink>
      </div>

      {/* CENTER (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "text-yellow-300 font-bold" : "")}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

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

export default ModeratorAuthorityNavbar;
