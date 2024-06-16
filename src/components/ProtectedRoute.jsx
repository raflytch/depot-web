import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../components/Loading"; // Import the Loading component

const ProtectedRoute = ({ element }) => {
  const [isValid, setIsValid] = useState(null); // null = not checked, true = valid, false = invalid

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/auth/verify-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Send token in the Authorization header
            },
          }
        );

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) {
    // Show the Loading component while checking token
    return <Loading />;
  }

  return isValid ? element : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
