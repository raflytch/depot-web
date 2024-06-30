// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/404";
import LandingPage from "./pages/landingpage";
import AuthLayout from "./template/AuthLayout";
import ProductPage from "./pages/product";
import AdminDashboard from "./pages/Admin"; // Import AdminDashboard
import UserDashboard from "./components/Dashboard"; // Import UserDashboard
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<AuthLayout mode="login" />} // Mode login
        />
        <Route
          path="/register"
          element={<AuthLayout mode="register" />} // Mode registrasi
        />
        <Route
          path="/products"
          element={<ProtectedRoute element={<ProductPage />} role="USER" />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} role="ADMIN" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
