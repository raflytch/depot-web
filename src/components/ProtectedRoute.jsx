import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, role }) => {
  const { role: userRole } = useSelector((state) => state.auth);

  if (userRole !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
