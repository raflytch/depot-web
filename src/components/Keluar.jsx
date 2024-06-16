import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Keluar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("access_token");
        Swal.fire({
          icon: "success",
          title: "Berhasil keluar",
          text: "Anda telah berhasil keluar.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="p-4 px-4">
      <h1 className="text-3xl font-bold mb-4">Keluar</h1>
      <button onClick={handleSignOut} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
};

export default Keluar;
