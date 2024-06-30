import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ element, role }) => {
  const { role: userRole } = useContext(AuthContext);

  if (!userRole) {
    // Jika role kosong, artinya pengguna belum login
    return <Navigate to="/login" />;
  }

  if (role && role.toUpperCase() !== userRole.toUpperCase()) {
    // Jika role tidak sesuai dengan yang diharapkan
    return <Navigate to="/login" />;
  }

  return <>
    {element}
    </>;
};

export default ProtectedRoute;
