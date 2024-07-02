import React from "react";
import { Link } from "react-router-dom";
import Aqua from "../assets/img/galon.jpg";
import kualitasAir from "../assets/img/refillulang.jpg";

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
    <div className="p-4 px-16 md:px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Dashboard
      </h1>

      {/* Bagian untuk Informasi Barang yang Sudah Dipublish */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Barang yang Sudah Dipublish
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publishedItems.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 w-full md:w-96 shadow-xl"
            >
              <div className="card-body p-4">
                <h3 className="card-title text-lg font-semibold mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Deskripsi singkat atau detail lainnya...
                </p>
              </div>
              <figure>
                <img
                  src={Aqua} // Ganti dengan path gambar produk
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian untuk Informasi Kualitas Air */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Kualitas Air Terbaru</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kualitasAirData.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 w-full md:w-96 shadow-xl"
            >
              <div className="card-body p-4">
                <h3 className="card-title text-lg font-semibold mb-2">
                  {item.tingkat}
                </h3>
                <p className="text-sm text-gray-600">{item.keterangan}</p>
              </div>
              <figure>
                <img
                  src={kualitasAir} // Ganti dengan path gambar kualitas air
                  alt={item.tingkat}
                  className="w-full h-48 object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Tautan navigasi ke halaman yang relevan */}
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link
          to="/admin/barang"
          className="btn btn-primary w-full lg:w-1/4 text-white"
        >
          Kelola Barang
        </Link>
        <Link
          to="/admin/kualitas-air"
          className="btn btn-primary w-full lg:w-1/4 text-white"
        >
          Kelola Kualitas Air
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
