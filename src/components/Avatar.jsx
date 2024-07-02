import React, { useState, useContext } from "react";
import AvatarManageAccount from "./AvatarManageAccount";
import { AuthContext } from "../contexts/AuthContext";

const Avatar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { nama, alamat } = useContext(AuthContext);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <div className="avatar online" onClick={handleAvatarClick}>
        <div className="w-16 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg">
          <AvatarManageAccount />
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
