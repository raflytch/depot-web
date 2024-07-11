import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import NotFound from "./pages/404";
import LandingPage from "./pages/landingpage";
import AuthLayout from "./template/AuthLayout";
import ProductPage from "./pages/product";
import AdminDashboard from "./pages/Admin";
import EditProfile from "./components/EditProfile"; // Import EditProfile
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthContext} from "./contexts/AuthContext.jsx";

const App = () => {
  useEffect(() => {
    const clientKey = "SB-Mid-client-BtWr-N86OkdW2Qfn"

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script)
    }
  })

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthLayout mode="login" />} />
        <Route path="/register" element={<AuthLayout mode="register" />} />
        <Route
          path="/products"
          element={<ProtectedRoute element={<ProductPage />} role="USER" />}
        />
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<AdminDashboard />} role="ADMIN" />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<EditProfile />} role="USER" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
