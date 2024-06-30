import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, role }) => {
  const userRole = useSelector((state) => state.auth.role);

  if (role === "ADMIN" && userRole !== "ADMIN") {
    return <Navigate to="/products" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
