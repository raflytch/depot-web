import React from "react";
import "./App.css";
import NotFound from "./pages/404";
import Button from "./components/Button";
import Card from "./components/Card";
import img1 from "../src/assets/img/galonaqua.png";
import LoginAdminPage from "./pages/LoginAdminPage";
import Footer from "./components/Footer";
import HeroLeft from "./components/HeroLeft";
import HeroRight from "./components/HeroRight";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landingpage";

const App = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default App;
