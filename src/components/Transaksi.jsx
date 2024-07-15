import React, { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
          const userRes = await fetch(
              import.meta.env.VITE_BACKEND_URI + "users/" + payment.userId,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
              },
            }
          )
          const user = await userRes.json();
          console.log(user);
          return {
            ...payment,
            product: product,
            user: user,
          };
        });
        formattedData = await Promise.all(formattedData);
        setPayments(formattedData);
        setShowedProducts(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleCetak = () => {
    if (payments) {
      createTable(payments)
    }
  }

  useEffect(() => {
    const filter = (status) => {
      let p;
      const now = new Date();
      if (status === "ALL") {
        p = payments;
      } else if (status === "LAST_WEEK") {
        const lastWeek = new Date(now.setDate(now.getDate() - 7));
        p = payments.filter((p) => new Date(p.timestamp) >= lastWeek);
      } else if (status === "LAST_MONTH") {
        const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
        p = payments.filter((p) => new Date(p.timestamp) >= lastMonth);
      } else {
        p = payments.filter((p) => p.status === status);
      }
      setShowedProducts(p);
    };

    filter(viewState);
  }, [payments, viewState]);

  const activeClassName = "text-blue-600 border-b-[3px] border-blue-500";

  return (
    <main className="pt-20 pb-8 px-4 lg:py-8 lg:pl-5 overflow-x-scroll min-h-screen">
      <h1 className="text-2xl font-bold text-primary">Transaksi</h1>
      <button onClick={handleCetak} className="btn btn-active mt-2">Download PDF</button>
      <section className="overflow-x-scroll lg:overflow-x-clip">
        <div className="flex gap-12 p-6 min-w-fit">
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "ALL" ? activeClassName : "")
            }
            onClick={() => setViewState("ALL")}
          >
            Semua
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
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "LAST_WEEK" ? activeClassName : "")
            }
            onClick={() => setViewState("LAST_WEEK")}
          >
            Seminggu Terakhir
          </span>
          <span
            className={
              "py-2 px-1 cursor-pointer font-semibold transition duration-200 " +
              (viewState === "LAST_MONTH" ? activeClassName : "")
            }
            onClick={() => setViewState("LAST_MONTH")}
          >
            Sebulan Terakhir
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
            <Table.HeadCell>Nama Pemesan</Table.HeadCell>
            <Table.HeadCell>Alamat</Table.HeadCell>
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
                <Table.Cell>{new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(payment.amount)}</Table.Cell>
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
                <Table.Cell>{payment.user.name}</Table.Cell>
                <Table.Cell>{payment.user.alamat}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </main>
  );
};

const createTable = (payments) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['#', 'Order ID', 'Tanggal', 'Nama Produk', 'Jumlah', 'Status', 'Nama Pemesan', 'Alamat']],
    body: payments.map((payment, index) => [
      index + 1,
      payment.id,
      new Date(payment.timestamp).toLocaleString(),
      payment.product.name,
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(payment.amount),
      payment.status,
      payment.user.name,
      payment.user.alamat,
    ]),
    theme: 'striped',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30 },
      2: { cellWidth: 20 },
      3: { cellWidth: 17 },
      4: { cellWidth: 25 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [224, 224, 224],
    },
    didParseCell: function (data) {
      if (data.section === 'body' && data.column.index === 5) {
        data.cell.styles.fontStyle = 'bold';
        if (data.cell.raw === 'SUCCESS') {
          data.cell.styles.textColor = [46, 204, 113];
        } else if (data.cell.raw === 'FAILED') {
          data.cell.styles.textColor = [231, 76, 60];
        } else {
          data.cell.styles.textColor = [255, 192, 0];
        }
      }
    },
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    }
  });

  doc.save('Laporan Transaksi.pdf');
}

export default Transaksi;
