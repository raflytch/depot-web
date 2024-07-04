import React, { useState, useContext, useEffect } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/img/logo.png";
import Avatar from "../components/Avatar";
import { AuthContext } from "../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Get token from context

  useEffect(() => {
    AOS.init({
      once: true, // Animasi hanya terjadi sekali
      duration: 800, // Durasi animasi (ms)
    });
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleOrderClick = () => {
    navigate("/products");
  };

  return (
    <nav
      className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 shadow-lg"
      data-aos="fade-down"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="Depot Anugrah Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Depot Anugrah
          </span>
        </a>
        <button
          onClick={handleMenuToggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <FaBarsStaggered size={24} />
        </button>
        <div
          className={`${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } fixed inset-0 top-16 z-40 w-full bg-gray-900 bg-opacity-90 md:hidden transition-opacity duration-500`}
        >
          <ul className="font-medium flex flex-col p-4 border border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleMenuToggle}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="heroRight"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleMenuToggle}
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                to="maps"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleMenuToggle}
              >
                Outlet
              </Link>
            </li>
            <li>
              <span
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => {
                  handleMenuToggle();
                  handleOrderClick();
                }}
              >
                Pemesanan
              </span>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleMenuToggle}
              >
                Kontak
              </Link>
            </li>
            {token && (
              <li>
                <Avatar />
              </li>
            )}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-700 dark:hover:text-blue-500"
          >
            Beranda
          </Link>
          <Link
            to="heroRight"
            smooth={true}
            duration={500}
            className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-700 dark:hover:text-blue-500"
          >
            Tentang
          </Link>
          <Link
            to="maps"
            smooth={true}
            duration={500}
            className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-700 dark:hover:text-blue-500"
          >
            Outlet
          </Link>
          <span
            className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-700 dark:hover:text-blue-500"
            onClick={handleOrderClick}
          >
            Pemesanan
          </span>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-700 dark:hover:text-blue-500"
          >
            Kontak
          </Link>
          {token && <Avatar />}
          {!token && <Button onClick={handleLoginClick} text="Login" />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
