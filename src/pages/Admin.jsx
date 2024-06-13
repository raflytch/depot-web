import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Barang from "../components/Barang";
import KualitasAir from "../components/KualitasAir";
import Transaksi from "../components/Transaksi";
import Keluar from "../components/Keluar";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="w-full p-4">
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/barang" element={<Barang />} />
          <Route path="/admin/kualitas-air" element={<KualitasAir />} />
          <Route path="/admin/transaksi" element={<Transaksi />} />
          <Route path="/admin/keluar" element={<Keluar />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
