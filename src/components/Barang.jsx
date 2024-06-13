import React, { useState } from "react";
import products from "../utils/product";

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
      <ul>
        {stokBarang.map((barang, index) => (
          <li key={index}>{`${barang.nama} - ${barang.jumlah}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Barang;
