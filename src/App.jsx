import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NotFound from "./pages/404";
import LandingPage from "./pages/landingpage";
import AuthLayout from "./template/AuthLayout";
import ProductPage from "./pages/product";
import AdminDashboard from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<AuthLayout />} />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute element={<AdminDashboard />} role="ADMIN" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
