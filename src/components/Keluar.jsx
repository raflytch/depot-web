import React from "react";
import { useNavigate } from "react-router-dom";

const Keluar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Keluar</h1>
      <button onClick={handleSignOut} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
};

export default Keluar;
