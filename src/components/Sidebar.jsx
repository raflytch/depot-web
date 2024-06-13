import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdViewList, MdOutlinePayment } from "react-icons/md";
import { FaHandHoldingWater, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex items-center justify-items-start mb-4 mt-14">
            <img src={logo} alt="Logo" className="h-10" />
            <p className="font-bold">Depot Anugrah</p>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard size={24} />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/barang"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdViewList size={24} />
                <span className="ml-3">Barang</span>
              </Link>
            </li>
            <li>
              <Link
                to="/kualitas-air"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHandHoldingWater size={24} />
                <span className="ml-3">Kualitas Air</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transaksi"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlinePayment size={24} />
                <span className="ml-3">Daftar Transaksi</span>
              </Link>
            </li>
            <li>
              <Link
                to="/keluar"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSignOutAlt size={24} />
                <span className="ml-3">Keluar</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
