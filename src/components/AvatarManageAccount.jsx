import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AvatarManageAccount = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3000/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      return alert("Logout gagal");
    }

    Cookies.remove("access_token");
    navigate("/");
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
