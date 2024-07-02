import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Alamat = () => {
  const { alamat } = useContext(AuthContext);

  return (
    <div className="alamat">
      <h2>Alamat Anda</h2>
      <p>{alamat ? alamat : "Alamat belum diatur"}</p>
    </div>
  );
};

export default Alamat;
