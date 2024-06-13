import React from "react";

const Input = ({ type, name, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered"
      required={required}
    />
  );
};

export default Input;
