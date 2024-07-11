import React from "react";
import { GiWaterGallon } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const CardProduct = () => {
  const [product, setProduct] = useState();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URI + "products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setProduct(data);
      console.log(data);
    })();
  }, []);
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <GiWaterGallon size={50} className="text-primary my-2" />
      <a href="#">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-black dark:text-white">
          Total Produk Yang Dijual
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {product?.length}
      </p>
      <Link
        to="/admin/barang"
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        Lihat Barang
        <FaExternalLinkAlt className="ml-2" />
      </Link>
    </div>
  );
};

export default CardProduct;
