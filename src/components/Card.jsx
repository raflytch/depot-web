import React, { useState } from "react";
import Button from "./Button";

const Card = ({ img, alt, title, children }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt={alt} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{children}</p>
        <div className="card-actions justify-end mt-5">
          <Button text="Beli" />
          <div className="flex gap-2 items-center">
            <Button text="+" onClick={handleIncrement} />
            <p className="font-bold text-primary">{quantity}</p>
            <Button text="-" onClick={handleDecrement} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
