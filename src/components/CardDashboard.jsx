import React, { useContext, useEffect, useState } from "react";
import { GiWaterGallon } from "react-icons/gi";
import { FaMoneyCheck, FaExternalLinkAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const CardDashboard = ({ type, description, link }) => {
  const [payments, setPayments] = useState([]);
  const { token } = useContext(AuthContext);

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
    })();
  }, [token]);

  const totalAmount = payments.reduce(
    (prev, curr) => prev + parseFloat(curr.amount),
    0
  );
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {type === "Product" ? (
        <GiWaterGallon size={50} className="text-primary my-2" />
      ) : (
        <FaMoneyCheck size={50} className="text-primary my-2" />
      )}
      <a href="#">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-black dark:text-white">
          {type === "Product"
            ? "Total Produk Yang Dijual"
            : "Total Daftar Transaksi"}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {formattedAmount}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Link
        to={link}
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        {type === "Product" ? "Lihat produk" : "Lihat transaksi"}
        <FaExternalLinkAlt className="ml-2" />
      </Link>
    </div>
  );
};

export default CardDashboard;
