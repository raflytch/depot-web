import React from "react";
import { Link } from "react-router-dom";
import CardDashboard from "./CardDashboard";

const Dashboard = () => {
  // Data contoh untuk barang yang sudah dipublish dan kualitas air
  const publishedItems = [
    { id: 1, name: "Produk A" },
    { id: 2, name: "Produk B" },
    { id: 3, name: "Produk C" },
  ];

  const kualitasAirData = [
    { id: 1, tingkat: "Baik", keterangan: "Sumber Mata Air" },
    { id: 2, tingkat: "Cukup", keterangan: "Sumber Sumur" },
    { id: 3, tingkat: "Buruk", keterangan: "Sumber Sungai" },
  ];

  return (
    <div className="p-4 px-20 md:px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Dashboard
      </h1>

      {/* Bagian untuk Informasi Barang yang Sudah Dipublish */}
      <CardDashboard />
    </div>
  );
};

export default Dashboard;
