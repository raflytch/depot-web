import React from "react";

const Tabel = () => {
  const items = [
    { id: 1, produk: "Produk A", kuantitas: 2, hargaSatuan: 50000 },
    { id: 2, produk: "Produk B", kuantitas: 3, hargaSatuan: 75000 },
    { id: 3, produk: "Produk C", kuantitas: 1, hargaSatuan: 120000 },
  ];

  const calculateTotal = (items) => {
    return items.reduce(
      (acc, item) => acc + item.kuantitas * item.hargaSatuan,
      0
    );
  };

  const totalKeseluruhan = calculateTotal(items);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Kuantitas</th>
            <th>Harga Satuan (IDR)</th>
            <th>Total (IDR)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-base-200" : ""}>
              <th>{index + 1}</th>
              <td>{item.produk}</td>
              <td>{item.kuantitas}</td>
              <td>{item.hargaSatuan.toLocaleString()}</td>
              <td>{(item.kuantitas * item.hargaSatuan).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="4" className="text-right">
              Total Keseluruhan (IDR)
            </th>
            <th>{totalKeseluruhan.toLocaleString()}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Tabel;
