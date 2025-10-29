import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * 🔒 ProtectedRoute Component
 * Restricts access based on login + optional role
 * 
 * @param {ReactNode} children - Page to render
 * @param {string} role - Optional role required ("admin", "host", or "user")
 */
const ProtectedRoute = ({ children, role }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // 🚫 Not logged in → go to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // ⚠️ Role-based restriction (if route requires specific role)
  if (role && userInfo.role !== role) {
    // If trying to access admin-only route as host/user → redirect home
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized → render the protected component
  return children;
};

export default ProtectedRoute;
