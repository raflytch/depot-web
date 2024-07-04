import React, { useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AvatarManageAccount = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Logout gagal");
      }

      Cookies.remove("access_token");
      dispatch({ type: "logged-out" });
      navigate("/");

      // SweetAlert untuk logout berhasil
      Swal.fire({
        icon: "success",
        title: "Logout Berhasil",
        text: "Anda telah berhasil logout dari akun Anda.",
        confirmButtonText: "Oke",
      });
    } catch (error) {
      console.error("Error saat logout:", error);

      // SweetAlert untuk logout gagal
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Logout gagal. Silakan coba lagi nanti.",
        confirmButtonText: "Tutup",
      });
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="menu p-2 shadow bg-white rounded-lg">
      <ul>
        <li>
          <a onClick={handleProfileClick}>Profil</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default AvatarManageAccount;
