import React from "react";

const Input = ({ type, placeholder, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered"
      required={required}
    />
  );
};

export default Input;
