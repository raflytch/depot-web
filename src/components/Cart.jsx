import React from "react";

const Cart = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="px-3 py-1 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
      >
        -
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        onClick={onIncrement}
        className="px-3 py-1 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default Cart;
