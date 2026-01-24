import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  // 1. Check if user exists
  // 2. Use Optional Chaining (?.) to check for role safely
  // 3. Provide a fallback empty array [] if allowedRoles is missing
  const hasAccess = user && allowedRoles?.includes(user?.role);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    // If they are logged in but don't have the right role, send them to a "denied" or dashboard page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;