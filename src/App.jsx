// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/404";
import LandingPage from "./pages/landingpage";
import LoginPage from "./pages/LoginUser"; // Import halaman login
import RegisterPage from "./pages/RegisterUser"; // Import halaman register
import ProductPage from "./pages/product"; // Import halaman produk

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Route untuk login */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Route untuk register */}
        <Route path="/products" element={<ProductPage />} />
        {/* Route untuk halaman produk */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
