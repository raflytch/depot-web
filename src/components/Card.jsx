import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import Button from "./Button";
import Cart from "./Cart";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext.jsx";
import RatingPopup from "./RatingPopUp";
import { useLocation } from "react-router-dom";

const Card = ({
  id,
  price,
  img,
  product,
  desc,
  stock,
  totalRating,
  totalPurchases,
  category,
}) => {
  const [cart, setCart] = useState([]);
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");
  const statusCode = queryParams.get("status_code");
  const transactionStatus = queryParams.get("transaction_status");

  const handleAddToCart = () => {
    const formattedPrice = parseFloat(
      price.replace(/[^\d,]/g, "").replace(",", ".")
    );
    const itemIndex = cart.findIndex((item) => item.product === product);
    if (itemIndex > -1) {
      const newCart = [...cart];
      if (newCart[itemIndex].count + 1 > stock) {
        Swal.fire({
          icon: "error",
          title: "Jumlah Melebihi Stok",
          text: "Jumlah item yang ingin ditambahkan melebihi stok yang tersedia.",
        });
      } else {
        newCart[itemIndex].count += 1;
        setCart(newCart);
      }
    } else {
      if (1 > stock) {
        Swal.fire({
          icon: "error",
          title: "Jumlah Melebihi Stok",
          text: "Jumlah item yang ingin ditambahkan melebihi stok yang tersedia.",
        });
      } else {
        const newItem = { product, price: formattedPrice, count: 1, id: id };
        setCart([...cart, newItem]);
      }
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    if (newCart[index].count === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index].count -= 1;
    }
    setCart(newCart);
  };

  const handlePurchase = async () => {
    const item = cart.find((item) => item.product === product);
    if (!item || item.count === 0) {
      Swal.fire({
        icon: "error",
        title: "Produk tidak boleh kosong",
        text: "Harap tambahkan produk sebelum membeli.",
      });
      return;
    }

    if (category === "REFILL_AIR_MINUM") {
      const result = await Swal.fire({
        title: "Apakah anda sekarang berada pada Depot Air Minum Anugrah?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
      });

      if (!result.isConfirmed) {
        Swal.fire({
          icon: "error",
          title: "Pembelian Ditolak",
          text: "Anda tidak berada di tempat depot air anugrah.",
        });
        return;
      }
    }

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URI + "payments/create-payment",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          quantity: item.count,
          productId: item.id,
        }),
      }
    );
    const data = await res.json();
    if (window.snap && res.ok) {
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          // Tampilkan RatingPopup setelah pembelian sukses
          setShowRatingPopup(true);
        },
        onPending: function (result) {
          console.log("Pending:", result);
        },
        onError: function (result) {
          Swal.fire({
            icon: "error",
            title: "Transaksi Gagal",
            text: "Terjadi kesalahan saat memproses transaksi.",
          });
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Midtrans tidak dimuat",
        text: "Periksa apakah script Midtrans dimuat dengan benar.",
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("IDR", "Rp")
      .trim();
  };

  const item = cart.find((item) => item.product === product);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="p-8 rounded-t-lg" src={img} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a>
          <h5 className="text-xl font-semibold tracking-tight text-primary py-2">
            {product}
          </h5>
        </a>
        <p className="text-sm font-normal tracking-tight text-gray-900">
          {desc}
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={20}
                color={
                  star <= totalRating / totalPurchases ? "#FFC94A" : "#EEEEEE"
                }
              />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {totalPurchases === 0
              ? 0
              : (totalRating / totalPurchases).toFixed(1)}{" "}
            {/* Membatasi ke satu desimal */}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg lg:text-xl font-bold text-primary dark:text-white">
            {formatPrice(
              parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."))
            )}
          </span>
          <div className="flex items-center">
            <Cart
              count={item?.count || 0} // Access item?.count safely
              onIncrement={handleAddToCart}
              onDecrement={() =>
                handleRemoveFromCart(
                  cart.findIndex((item) => item.product === product)
                )
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Stok: {stock !== null ? stock : "Memuat..."}
          </span>
          {item && ( // Check if item exists before rendering subtotal
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtotal: {formatPrice(item.count * item.price)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button text={"Beli Sekarang"} onClick={handlePurchase} />
        </div>
      </div>
      {orderId && transactionStatus === "settlement" && statusCode === "200" ? (
        <RatingPopup paymentId={orderId} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
