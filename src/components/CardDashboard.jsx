import React, {useContext, useEffect, useState} from "react";
import {GiWaterGallon} from "react-icons/gi";
import {FaMoneyCheck, FaExternalLinkAlt} from "react-icons/fa";
import {AuthContext} from "../contexts/AuthContext.jsx";

const CardDashboard = ({type, description, link}) => {
    const [payments, setPayments] = useState();
    const { token } = useContext(AuthContext);

    const renderIcon = () => {
        if (type === "Product") {
            return <GiWaterGallon size={50} className="text-primary my-2"/>;
        } else if (type === "Transaction") {
            return <FaMoneyCheck size={50} className="text-primary my-2"/>;
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
            const res = await fetch(
                import.meta.env.VITE_BACKEND_URI + "payments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();

            setPayments(data);
            console.log(data)
        })()
    }, [])

    return (
        <div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {renderIcon()}
            <a href={renderLink()}>
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-black dark:text-white">
                    {type === "Product"
                        ? "Total Produk Yang Dijual"
                        : "Total Daftar Transaksi"}
                </h5>
            </a>
            <p>
                {payments?.length}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {description}
            </p>
            <a
                href={renderLink()}
                className="inline-flex font-medium items-center text-blue-600 hover:underline"
            >
                {type === "Product" ? "Lihat produk" : "Lihat transaksi"}
                <FaExternalLinkAlt className="ml-2"/>
            </a>
        </div>
    );
};

export default CardDashboard;
