import React from "react";

const Label = ({ title }) => {
  return (
    <label className="label">
      <span className="label-text font-bold">{title}</span>
    </label>
  );
};

export default Label;
