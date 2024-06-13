import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleOrderClick = () => {
    navigate("/products"); // Navigate to the product page
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 shadow-lg">
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
            <li>
              <Button onClick={handleLoginClick} text="Login" />
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="heroRight"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                to="maps"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Outlet
              </Link>
            </li>
            <li>
              <span
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={handleOrderClick}
              >
                Pemesanan
              </span>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="block py-2 px-3 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Kontak
              </Link>
            </li>
          </ul>
          <Button onClick={handleLoginClick} text="Masuk" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
