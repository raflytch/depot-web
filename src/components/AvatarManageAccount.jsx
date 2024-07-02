import React, { useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AvatarManageAccount = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
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
    dispatch({ type: "logged-out" });
    navigate("/");
  };

  const handleProfileClick = () => {
    // Redirect to /profile
    navigate("/profile");
  };

  return (
    <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <a onClick={handleProfileClick}>Profil</a>
      </li>
      <li>
        <a onClick={handleLogout}>Logout</a>
      </li>
    </div>
  );
};

export default AvatarManageAccount;
