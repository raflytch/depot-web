import React, { useState, useEffect } from "react";
import Button from "./Button";
import Cart from "./Cart";
import Modal from "./Modal";
import { FaStar } from "react-icons/fa";

const Card = ({ price, img, product, desc, fetchStock }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const getStock = async () => {
      const stockData = await fetchStock(product);
      setStock(stockData);
    };
    getStock();
  }, [product, fetchStock]);

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

  const handleOpenModal = () => {
    setModalOpen(true);
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
          <Cart
            count={cart.find((item) => item.product === product)?.count || 0}
            onIncrement={handleAddToCart}
            onDecrement={() =>
              handleRemoveFromCart(
                cart.findIndex((item) => item.product === product)
              )
            }
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Stok: {stock !== null ? stock : "Memuat..."}
          </span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button text={"Tambah Ke Keranjang"} onClick={handleOpenModal} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cartItems={cart}
        total={formatPrice(total)}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Card;
