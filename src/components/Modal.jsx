import React from "react";

const Modal = ({ isOpen, onClose, cartItems, total, onRemoveItem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Keranjang Pembayaran</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span>{item.product}</span>
                  <span>
                    {item.count} x {item.price.toFixed(0)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Keranjang Anda kosong</p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span>{total}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Tutup
          </button>
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
