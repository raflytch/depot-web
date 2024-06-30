import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element, role }) => {
  const { role: _role, token } = useContext(AuthContext);

  console.log(token);
  console.log(_role);
  console.log(role);

  if (!_role) {
    // Jika role kosong, artinya pengguna belum login
    return <Navigate to="/login" />;
  }

  if (role.toUpperCase() !== _role.toUpperCase()) {
    // Jika role tidak sesuai dengan yang diharapkan
    return <Navigate to="/login" />;
  }

  return <>
    {element}
    </>;
};

export default ProtectedRoute;
