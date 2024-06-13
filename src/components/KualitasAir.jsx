import React, { useState } from "react";

const KualitasAir = () => {
  const [kualitasAir, setKualitasAir] = useState([]);

  const handleAddKualitas = (event) => {
    event.preventDefault();
    const newKualitas = {
      tingkat: event.target.tingkat.value,
      keterangan: event.target.keterangan.value,
    };
    setKualitasAir([...kualitasAir, newKualitas]);
    event.target.reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Kualitas Air</h1>
      <form onSubmit={handleAddKualitas}>
        <div>
          <label>Tingkat Kualitas</label>
          <input type="text" name="tingkat" required />
        </div>
        <div>
          <label>Keterangan</label>
          <input type="text" name="keterangan" required />
        </div>
        <button type="submit">Tambah Kualitas</button>
      </form>
      <ul>
        {kualitasAir.map((kualitas, index) => (
          <li key={index}>{`${kualitas.tingkat} - ${kualitas.keterangan}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default KualitasAir;
