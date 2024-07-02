import React, { useState, useContext } from "react";
import AvatarManageAccount from "./AvatarManageAccount";
import { AuthDispatchContext, AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Avatar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useContext(AuthDispatchContext);
  const { nama, alamat } = useContext(AuthContext);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddAddress = async () => {
    const { value: address } = await Swal.fire({
      title: "Masukkan Alamat",
      input: "text",
      inputLabel: "Alamat",
      inputPlaceholder: "Masukkan alamat Anda",
      showCancelButton: true,
    });

    if (address) {
      dispatch({
        type: "set-alamat",
        alamat: address,
      });
      Swal.fire(`Alamat berhasil disimpan: ${address}`);
    }
  };

  return (
    <div>
      <div className="avatar online" onClick={handleAvatarClick}>
        <div className="w-24 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      {showDropdown && (
        <div>
          <AvatarManageAccount />
          <button onClick={handleAddAddress}>Tambah Alamat</button>
        </div>
      )}
      <div className="text-white">
        <p>{nama}</p>
        <p>{alamat}</p>
      </div>
    </div>
  );
};

export default Avatar;
