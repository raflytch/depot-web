import React, { useState } from "react";

const Barang = () => {
  const [stokBarang, setStokBarang] = useState([]);

  const handleAddBarang = (event) => {
    event.preventDefault();
    const newBarang = {
      nama: event.target.nama.value,
      jumlah: event.target.jumlah.value,
    };
    setStokBarang([...stokBarang, newBarang]);
    event.target.reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Stok Barang</h1>
      <form onSubmit={handleAddBarang}>
        <div>
          <label>Nama Barang</label>
          <input type="text" name="nama" required />
        </div>
        <div>
          <label>Jumlah</label>
          <input type="number" name="jumlah" required />
        </div>
        <button type="submit">Tambah Barang</button>
      </form>
      <ul>
        {stokBarang.map((barang, index) => (
          <li key={index}>{`${barang.nama} - ${barang.jumlah}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Barang;
