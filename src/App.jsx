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
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
        <Route path="/products" element={<ProductPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<UserDashboard />} role="user" />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} role="admin" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
