import React from "react";

const Button = ({ onClick, text, type }) => {
  return (
    <button
      className="btn btn-primary text-white"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
