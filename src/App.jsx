import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/404";
import LandingPage from "./pages/landingpage";
import LoginPage from "./pages/LoginUser";
import RegisterPage from "./pages/RegisterUser";
import ProductPage from "./pages/product";
import Admin from "./pages/Admin";
import LoginAdminPage from "./pages/LoginAdminPage"; // Import admin login page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/admin-login" element={<LoginAdminPage />} />{" "}
        {/* Admin login route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
