import React, { useContext } from "react";
import { AuthDispatchContext, AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AvatarManageAccount = () => {
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    dispatch({ type: "logged-out" });
    navigate("/");
  };

  return (
    <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <a href="/profile">Profil</a>
      </li>
      <li>
        <a onClick={handleLogout}>Logout</a>
      </li>
    </div>
  );
};

export default AvatarManageAccount;
