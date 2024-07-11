import React, { useState, useEffect, useContext } from "react";
import { LuPencilLine } from "react-icons/lu";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const Barang = () => {
  const [stokBarang, setStokBarang] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Memuat data produk dari API saat komponen dimuat
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URI + "products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // Menyusun data produk sesuai format yang dibutuhkan
      const formattedData = data.map((product) => ({
        ...product,
        nama: product.name,
        jumlah: product.stock,
        kualitasAir: kualitasAirMapper(product.kualitasAir),
      }));
      setStokBarang(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditBarang = (index) => {
    const barang = stokBarang[index];

    Swal.fire({
      title: "Edit Barang",
      html: `
        <label>Nama Barang</label>
        <input type="text" id="namaBarang" class="swal2-input" value="${
          barang.nama
        }" readonly>
        <label>Jumlah</label>
        <input type="number" id="jumlahBarang" class="swal2-input" value="${
          barang.jumlah
        }">
        <label>Kualitas Air</label>
        <select id="kualitasAir" class="swal2-input">
          <option value="Sangat Baik" ${
            barang.kualitasAir === "Sangat Baik" ? "selected" : ""
          }>Sangat Baik</option>
          <option value="Baik" ${
            barang.kualitasAir === "Baik" ? "selected" : ""
          }>Baik</option>
          <option value="Sedang" ${
            barang.kualitasAir === "Sedang" ? "selected" : ""
          }>Sedang</option>
          <option value="Buruk" ${
            barang.kualitasAir === "Buruk" ? "selected" : ""
          }>Buruk</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        const jumlah = Swal.getPopup().querySelector("#jumlahBarang").value;
        const kualitasAir = Swal.getPopup().querySelector("#kualitasAir").value;
        if (!jumlah || jumlah <= 0) {
          Swal.showValidationMessage(`Jumlah harus lebih dari 0`);
        }
        return { id: barang.id, jumlah: parseInt(jumlah), kualitasAir };
      },
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URI +
            "products/" +
            result.value.id +
            "/update",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "PATCH",
            body: JSON.stringify({
              name: result.value.barang,
              stock: result.value.jumlah,
              kualitasAir: kualitasAirMapper(result.value.kualitasAir),
            }),
          }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal mengedit barang. Silakan coba lagi.",
          });
        }

        setStokBarang((prevStokBarang) => {
          const updatedStokBarang = [...prevStokBarang];
          updatedStokBarang[index] = {
            ...updatedStokBarang[index],
            jumlah: data.stock,
            kualitasAir: kualitasAirMapper(data.kualitasAir),
          };
          return updatedStokBarang;
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Barang telah diperbarui.",
        });
      }
    });
  };

  return (
    <div className="p-4 px-14">
      <h1 className="text-xl font-bold mb-4 text-primary lg:text-3xl">
        Stok Barang
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Kualitas Air</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stokBarang.map((barang, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{barang.nama}</td>
                <td>{barang.jumlah}</td>
                <td>{barang.kualitasAir}</td>
                <td>
                  <button
                    onClick={() => handleEditBarang(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <LuPencilLine size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const kualitasAirMapper = (kualitasAir) => {
  switch (kualitasAir) {
    case "SANGAT_BAIK":
      return "Sangat Baik";
    case "BAIK":
      return "Baik";
    case "CUKUP":
      return "Cukup";
    case "BURUK":
      return "Buruk";
    case "Sangat Baik":
      return "SANGAT_BAIK";
    case "Baik":
      return "BAIK";
    case "Cukup":
      return "CUKUP";
    case "Buruk":
      return "BURUK";
    default:
      return "";
  }
};

export default Barang;
