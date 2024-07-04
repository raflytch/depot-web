import React from "react";
import Label from "./Label";

const TextArea = ({ name, value, onChange, placeholder, required }) => {
  return (
    <div className="form-control">
      <Label title="Kritik dan Saran" />
      <textarea
        id="message"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block p-2.5 w-full text-md text-gray-900 rounded-lg input-bordered input resize-none h-32 lg:h-40"
        required={required}
      ></textarea>
    </div>
  );
};

export default TextArea;
