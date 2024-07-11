import React from "react";
import { Link } from "react-router-dom";
import CardDashboard from "./CardDashboard";
import CardProduct from "./CardProduct";

const Dashboard = () => {
  return (
    <div className="p-4 px-20 md:px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Dashboard
      </h1>

      {/* Bagian untuk Informasi Barang yang Sudah Dipublish */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <CardDashboard />
        <CardProduct />
      </div>
    </div>
  );
};

export default Dashboard;
