import React, { useContext, useEffect, useState } from "react";
import { GiWaterGallon } from "react-icons/gi";
import { FaMoneyCheck, FaExternalLinkAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const CardDashboard = ({ type, description, link }) => {
  const [payments, setPayments] = useState([]);
  const { token } = useContext(AuthContext);

  const renderIcon = () => {
    if (type === "Product") {
      return <GiWaterGallon size={50} className="text-primary my-2" />;
    } else if (type === "Transaction") {
      return <FaMoneyCheck size={50} className="text-primary my-2" />;
    }
    return null;
  };

  const renderLink = () => {
    if (type === "Product") {
      return "/admin/barang";
    } else if (type === "Transaction") {
      return "/admin/transaksi";
    }
    return "#";
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URI + "payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      setPayments(data.filter((p) => p.status === "SUCCESS"));
      console.log(data);
    })();
  }, []);

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {renderIcon()}
      <FaMoneyCheck size={50} className="text-primary my-2" />
      <a href="#">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-black dark:text-white">
          Total Produk Yang Dijual
        </h5>
      </a>
      <p>
        {payments.reduce((prev, curr) => prev + parseFloat(curr.amount), 0)}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Link
        to="/admin/transaksi"
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        Lihat Daftar Transaksi
        <FaExternalLinkAlt className="ml-2" />
      </Link>
    </div>
  );
};

export default CardDashboard;
