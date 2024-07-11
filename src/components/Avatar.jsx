import React, { useState, useContext, useEffect } from "react";
import AvatarManageAccount from "./AvatarManageAccount";
import { AuthContext } from "../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Avatar = ({ className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { nama, alamat } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      once: true, // Animasi hanya terjadi sekali
      duration: 800, // Durasi animasi (ms)
    });
  }, []);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={"relative " + className}>
      <div className="avatar online" onClick={handleAvatarClick}>
        <div className="ml-3 lg:ml-0 w-12 rounded-full">
          <img
            src="https://cdn-icons-png.freepik.com/512/4226/4226726.png"
            alt="Avatar"
          />
        </div>
      </div>
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg"
          data-aos="fade-down" // Tambahkan atribut AOS
        >
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
