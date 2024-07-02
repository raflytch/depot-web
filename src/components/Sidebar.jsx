// Sidebar.jsx

import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdViewList, MdOutlinePayment } from "react-icons/md";
import { FaHandHoldingWater, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("access_token");
        Swal.fire({
          icon: "success",
          title: "Berhasil keluar",
          text: "Anda telah berhasil keluar.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
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
          <div className="flex items-center justify-start mb-4 mt-14">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <p className="font-bold text-gray-900 dark:text-gray-200">
              Depot Anugrah
            </p>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin"
                className={`flex items-center p-2 px-4 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onClick={toggleSidebar} // Memanggil toggleSidebar untuk menutup sidebar
              >
                <MdDashboard size={24} />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/barang"
                className="flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar} // Memanggil toggleSidebar untuk menutup sidebar
              >
                <MdViewList size={24} />
                <span className="ml-3">Barang</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/kualitas-air"
                className="flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar} // Memanggil toggleSidebar untuk menutup sidebar
              >
                <FaHandHoldingWater size={24} />
                <span className="ml-3">Kualitas Air</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/transaksi"
                className="flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar} // Memanggil toggleSidebar untuk menutup sidebar
              >
                <MdOutlinePayment size={24} />
                <span className="ml-3">Daftar Transaksi</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSignOutAlt size={24} />
                <span className="ml-3">Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
