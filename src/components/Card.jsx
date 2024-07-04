import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "./Button";
import Cart from "./Cart";
import { FaStar } from "react-icons/fa";

const Card = ({ price, img, product, desc, fetchStock }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const getStock = async () => {
      const stockData = await fetchStock(product);
      setStock(stockData);
    };
    getStock();
  }, [fetchStock, product]);

  const handleAddToCart = () => {
    const formattedPrice = parseFloat(
      price.replace(/[^\d,]/g, "").replace(",", ".")
    );
    const itemIndex = cart.findIndex((item) => item.product === product);
    if (itemIndex > -1) {
      const newCart = [...cart];
      newCart[itemIndex].count += 1;
      setCart(newCart);
    } else {
      const newItem = { product, price: formattedPrice, count: 1 };
      setCart([...cart, newItem]);
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

  const handlePurchase = () => {
    const item = cart.find((item) => item.product === product);
    if (!item || item.count === 0) {
      Swal.fire({
        icon: "error",
        title: "Produk tidak boleh kosong",
        text: "Harap tambahkan produk sebelum membeli.",
      });
    } else {
      // Replace this with your Midtrans integration
      if (window.snap) {
        window.snap.pay("97508451-42e5-483d-9052-ed3d68b034c8");
      } else {
        Swal.fire({
          icon: "error",
          title: "Midtrans not loaded",
          text: "Please check if the Midtrans script is correctly loaded.",
        });
      }
    }
  };

  const total = cart.reduce((acc, item) => acc + item.count * item.price, 0);

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
                color={star <= (hover || rating) ? "#FFC94A" : "#EEEEEE"}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating}.0
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
              count={item?.count || 0}
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
          {item && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtotal: {formatPrice(item.count * item.price)}
            </span>
          )}
        </div>
        <div id="snap-kontol"></div>
        <div className="flex items-center justify-center mt-4">
          <Button text={"Beli Sekarang"} onClick={handlePurchase} />
        </div>
      </div>
    </div>
  );
};

export default Card;
