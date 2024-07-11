import React, { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { kualitasAirMapper } from "./Barang.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Transaksi = () => {
  const { token } = useContext(AuthContext);
  const [viewState, setViewState] = useState("ALL");
  const [payments, setPayments] = useState([]);
  const [showedProducts, setShowedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URI + "payments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // Menyusun data produk sesuai format yang dibutuhkan
        let formattedData = data.map(async (payment) => {
          const res = await fetch(
            import.meta.env.VITE_BACKEND_URI + "products/" + payment.productId,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const product = await res.json();
          return {
            ...payment,
            product: product,
          };
        });
        formattedData = await Promise.all(formattedData);
        console.log(formattedData);
        setPayments(formattedData);
        setShowedProducts(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const filter = (status) => {
      let p;
      if (status === "ALL") {
        p = payments;
      } else {
        p = payments.filter((p) => p.status === status);
      }
      setShowedProducts(p);
    };

    filter(viewState);
  }, [payments, viewState]);

  const activeClassName = "text-blue-600 border-b-[3px] border-blue-500";

  return (
    <main className="pt-20 pb-8 px-4 lg:py-8 lg:pl-5">
      <h1 className="text-2xl font-bold text-primary">Transaksi</h1>
      <section className="overflow-x-scroll lg:overflow-x-clip">
        <div className="flex gap-12 p-6 min-w-fit">
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "ALL" ? activeClassName : "")
            }
            onClick={() => setViewState("ALL")}
          >
            All
          </span>
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "SUCCESS" ? activeClassName : "")
            }
            onClick={() => setViewState("SUCCESS")}
          >
            Success
          </span>
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "PENDING" ? activeClassName : "")
            }
            onClick={() => setViewState("PENDING")}
          >
            Pending
          </span>
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "FAILED" ? activeClassName : "")
            }
            onClick={() => setViewState("FAILED")}
          >
            Failed
          </span>
        </div>
      </section>
      <section className="">
        <Table hoverable className="absolute">
          <Table.Head className="text-left">
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Tanggal</Table.HeadCell>
            <Table.HeadCell>Nama Produk</Table.HeadCell>
            <Table.HeadCell>Jumlah</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {showedProducts.map((payment, index) => (
              <Table.Row key={index + 1}>
                <Table.Cell className="font-semibold">{index + 1}</Table.Cell>
                <Table.Cell>{payment.id}</Table.Cell>
                <Table.Cell>
                  {new Date(payment.timestamp).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{payment.product.name}</Table.Cell>
                <Table.Cell>{payment.amount}</Table.Cell>
                <Table.Cell
                  className={
                    "font-semibold " +
                    (payment.status === "PENDING"
                      ? "text-yellow-400"
                      : payment.status === "SUCCESS"
                      ? "text-green-400"
                      : "text-red-700")
                  }
                >
                  {payment.status}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </main>
  );
};

export default Transaksi;
