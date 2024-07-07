import React, { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const KualitasAir = () => {
  const [kualitasAir, setKualitasAir] = useState([]);

  const handleAddKualitas = async (event) => {
    event.preventDefault();

    // Tampilkan SweetAlert untuk konfirmasi
    Swal.fire({
      title: "Tambah Kualitas Air?",
      text: "Apakah Anda yakin ingin menambahkan kualitas air ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Tambahkan!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const accessToken = Cookies.get("access_token");
        const url = import.meta.env.VITE_BACKEND_URI + "products/kualitas-air";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            tingkat: event.target.tingkat.value,
            keterangan: event.target.keterangan.value,
          }),
        });

        if (res.ok) {
          const newKualitas = {
            tingkat: event.target.tingkat.value,
            keterangan: event.target.keterangan.value,
          };
          setKualitasAir([...kualitasAir, newKualitas]);
          event.target.reset();

          // Tampilkan SweetAlert untuk sukses menambahkan kualitas air
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Kualitas air telah ditambahkan.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal menambahkan kualitas air. Silakan coba lagi.",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Kualitas Air
      </h1>
      <form onSubmit={handleAddKualitas}>
        <div>
          <label className="label">Tingkat Kualitas</label>
          <select name="tingkat" required className="select select-bordered">
            <option value="Sangat Baik">Sangat Baik</option>
            <option value="Baik">Baik</option>
            <option value="Cukup">Cukup</option>
            <option value="Buruk">Buruk</option>
          </select>
        </div>
        <div>
          <label className="label">Keterangan</label>
          <input
            type="text"
            name="keterangan"
            required
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Tambah Kualitas
        </button>
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
