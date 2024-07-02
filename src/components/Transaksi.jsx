import React from "react";
import Table from "../components/Table"; // Import komponen Tabel

const Transaksi = () => {
  return (
    <div className="p-4 px-14">
      <h1 className="text-xl font-bold mb-4 lg:text-3xl text-primary">
        Daftar Transaksi
      </h1>
      <p>Daftar transaksi yang telah dilakukan.</p>

      {/* Memasukkan komponen Tabel */}
      <Table />
    </div>
  );
};

export default Transaksi;
