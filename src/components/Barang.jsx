import React, { useState } from "react";
import products from "../utils/product";
import Swal from "sweetalert2";

const Barang = () => {
  const [stokBarang, setStokBarang] = useState([]);

  const handleAddBarang = (event) => {
    event.preventDefault();
    const newBarang = {
      nama: event.target.nama.value,
      jumlah: event.target.jumlah.value,
    };

    // Tampilkan SweetAlert untuk konfirmasi
    Swal.fire({
      title: "Tambah Barang?",
      text: "Apakah Anda yakin ingin menambahkan barang ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Tambahkan!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setStokBarang([...stokBarang, newBarang]);
        event.target.reset();

        // Tampilkan SweetAlert untuk sukses menambahkan barang
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Barang telah ditambahkan.",
        });
      }
    });
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4 px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Stok Barang
      </h1>
      <form onSubmit={handleAddBarang}>
        <div>
          <label className="label">Nama Barang</label>
          <select name="nama" required className="select select-bordered">
            {Object.keys(groupedProducts).map((category) => (
              <optgroup label={category} key={category}>
                {groupedProducts[category].map((product) => (
                  <option value={product.product} key={product.product}>
                    {product.product}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Jumlah</label>
          <input
            type="number"
            name="jumlah"
            required
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Tambah Barang
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {stokBarang.map((barang, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{barang.nama}</td>
                <td>{barang.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Barang;
